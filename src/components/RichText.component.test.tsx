import "@testing-library/jest-dom/vitest";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  armourClassIconLink,
  AttributeImages,
  ZodAttributeType,
  ZodDamageType,
  ZodDiceSize,
  type AttributeType,
  type DamageType,
  type DiceSize,
} from "@/store/items";

import RichTextComponent from "@/components/RichText.component";

/**
 * On mock i18n pour éviter toute dépendance à la config i18n dans les tests.
 * Le `t()` retourne simplement la clé, ce qui nous permet de vérifier
 * que le bon damageType est passé sans coupler les tests aux traductions
 */
vi.mock("@/lib/i18n", () => ({
  default: {
    t: (key: string) => key,
  },
}));

const formatDiceDamageInput = (
  diceCount: number,
  diceSize: DiceSize,
  damageType: DamageType,
  flatBonus?: number,
) =>
  `[${diceCount}d${diceSize}${flatBonus !== undefined ? `+${flatBonus}` : ""}:${damageType}]`;

describe("Damage dices - all dices and damage types combinaisons", () => {
  type TestCase = {
    name: string;
    input: string;
    diceCount: number;
    diceSize: DiceSize;
    damageType: DamageType;
  };

  const cases: TestCase[] = ZodDamageType.options.flatMap((damageType) =>
    ZodDiceSize.options.map((diceSize) => ({
      name: `1d${diceSize.value}:${damageType} -> rendu correct`,
      input: formatDiceDamageInput(1, diceSize.value, damageType),
      diceCount: 1,
      diceSize: diceSize.value,
      damageType,
    })),
  );

  test.each(cases)("$name", ({ input, diceCount, diceSize, damageType }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent, `got ${paragraph?.textContent}`).toContain(
      `${diceCount}d${diceSize}damageTypes.${damageType}`,
    );

    const image = screen
      .getAllByRole("img", { name: "damage-type" })
      .find(
        (img) => img.getAttribute("src") === AttributeImages.get(damageType),
      );
    expect(image).toBeDefined();
  });
});

describe("Damage dice - variable dice count", () => {
  type TestCase = {
    name: string;
    input: string;
    diceCount: number;
  };

  const FIRST_DAMAGE_TYPE = ZodDamageType.options[0];

  const cases: TestCase[] = [1, 2, 5, 10, 99].map((diceCount) => ({
    name: `${diceCount}d6:${FIRST_DAMAGE_TYPE} -> affiche ${diceCount}d6`,
    diceCount,
    input: formatDiceDamageInput(diceCount, 6, FIRST_DAMAGE_TYPE),
  }));

  test.each(cases)("$name", ({ input, diceCount }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent, `got ${paragraph?.textContent}`).toContain(
      `${diceCount}d6`,
    );
  });
});

describe("Damage dice - With flat bonus", () => {
  type TestCase = {
    name: string;
    input: string;
    flatBonus: number;
  };

  const FIRST_DAMAGE_TYPE: DamageType = ZodDamageType.options[0];

  const cases: TestCase[] = [1, 2, 5, 9].map((flatBonus) => ({
    name: `1d6+${flatBonus}:${FIRST_DAMAGE_TYPE} -> affiche +${flatBonus}`,
    flatBonus,
    input: formatDiceDamageInput(1, 6, FIRST_DAMAGE_TYPE, flatBonus),
  }));

  test.each(cases)("$name", ({ input, flatBonus }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).toContain(
      `1d6+${flatBonus}:${FIRST_DAMAGE_TYPE}`,
    );
  });

  test("Without bonus -> the +n span is absent", () => {
    const { container } = render(
      <RichTextComponent
        text={formatDiceDamageInput(1, 6, FIRST_DAMAGE_TYPE)}
      />,
    );

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).not.toContain(/^\+d+$/);
    expect(screen.queryByText(/^\+d+$/)).not.toBeInTheDocument();
  });
});

describe("With text around the pattern", () => {
  type TestCase = {
    name: string;
    input: string;
    surroundingText: string;
  };

  const FIRST_DAMAGE_TYPE: DamageType = ZodDamageType.options[0];
  const dice = formatDiceDamageInput(1, 6, FIRST_DAMAGE_TYPE);

  const cases: TestCase[] = [
    {
      name: "Text before the pattern",
      input: `Deals ${dice}`,
      surroundingText: "Deals ",
    },
    {
      name: "Text after the pattern",
      input: `${dice} damages`,
      surroundingText: " damages",
    },
    {
      name: "Text before and after the pattern",
      input: `Deals ${dice} damages`,
      surroundingText: " damages",
    },
  ];

  test.each(cases)("$name", ({ input, surroundingText }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).toContain(surroundingText);
  });
});

describe("Damage dice - input that does not respect any pattern", () => {
  interface InvalidCase {
    name: string;
    input: string;
    expectedRawText: string;
  }

  const cases: InvalidCase[] = [
    {
      name: "Invalid dice size (d7)",
      input: "[1d7:fire]",
      expectedRawText: "[1d7:fire]",
    },
    {
      name: "Invalid dice size (d0)",
      input: "[1d0:fire]",
      expectedRawText: "[1d0:fire]",
    },
    {
      name: "Invalid damage type",
      input: "[1d6:error]",
      expectedRawText: "[1d6:error]",
    },
    {
      name: "Missing square brackets",
      input: "1d6:fire",
      expectedRawText: "1d6:fire",
    },
    {
      name: "Missing opening square bracket",
      input: "1d6:fire]",
      expectedRawText: "1d6:fire]",
    },
    {
      name: "Missing closing square bracket",
      input: "[1d6:fire",
      expectedRawText: "[1d6:fire",
    },
    {
      name: "Missing 'd' and damage separator",
      input: "[1d6fire]",
      expectedRawText: "[1d6fire]",
    },
    {
      name: "empty string",
      input: "",
      expectedRawText: "",
    },
    {
      name: "Text without any pattern",
      input: "Text without any pattern",
      expectedRawText: "Text without any pattern",
    },
  ];

  test.each(cases)(
    "$name — Text rendered as is",
    ({ input, expectedRawText }) => {
      render(<RichTextComponent text={input} />);

      // Le texte brut est affiché tel quel (si non vide)
      if (expectedRawText) {
        expect(screen.getByText(expectedRawText)).toBeInTheDocument();
      }
    },
  );
});

const formatArmourClassInput = (
  armourClass: number,
  attributeType?: AttributeType,
) => `[ac:${armourClass}${attributeType ? `+${attributeType}` : ""}]`;

describe("Armor class - Displaying with every attributes", () => {
  type TestCase = {
    name: string;
    armourClass: number;
    input: string;
  };

  const armourClasses = [2, 5, 9, 10, 15, 22];

  const cases: TestCase[] = ZodAttributeType.options.flatMap((attribute) =>
    armourClasses.map((ac) => ({
      name: `ac:${ac}+${attribute} -> rendu correct`,
      armourClass: ac,
      input: formatArmourClassInput(ac, attribute),
    })),
  );

  test.each(cases)("$name", ({ armourClass, input }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).toContain(
      `${armourClass}inventory.armourClass form.modifier`,
    );

    const image = screen
      .getAllByRole("img", { name: "armour-class-icon" })
      .find((img) => img.getAttribute("src") === armourClassIconLink);
    expect(image).toBeDefined();
  });
});

describe("Armor class - Any number possible with every attribute bonus", () => {
  type TestCase = {
    name: string;
    armourClass: number;
    input: string;
  };

  const armourClasses = [2, 5, 9, 10, 15, 22];

  const cases: TestCase[] = ZodAttributeType.options.flatMap((attribute) =>
    armourClasses.map((ac) => ({
      name: `ac:${ac}+${attribute} -> rendu correct`,
      armourClass: ac,
      input: formatArmourClassInput(ac, attribute),
    })),
  );

  test.each(cases)("$name", ({ armourClass, input }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).toContain(
      `${armourClass}inventory.armourClass form.modifier`,
    );

    const image = screen
      .getAllByRole("img", { name: "armour-class-icon" })
      .find((img) => img.getAttribute("src") === armourClassIconLink);
    expect(image).toBeDefined();
  });
});

describe("Armor class - Without attribute", () => {
  type TestCase = {
    name: string;
    armourClass: number;
    input: string;
  };

  const armourClasses = [2, 5, 9, 10, 15, 22];

  const cases: TestCase[] = armourClasses.map((ac) => ({
    name: `ac:${ac} -> rendu correct`,
    armourClass: ac,
    input: formatArmourClassInput(ac),
  }));

  test.each(cases)("$name", ({ armourClass, input }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).toContain(
      `${armourClass}inventory.armourClass`,
    );

    expect(paragraph?.textContent).not.toContain("form.modifier");

    const image = screen
      .getAllByRole("img", { name: "armour-class-icon" })
      .find((img) => img.getAttribute("src") === armourClassIconLink);
    expect(image).toBeDefined();
  });
});

describe("Armor class - Without attribute -> the +attribute is absent", () => {
  type TestCase = {
    name: string;
    armourClass: number;
    input: string;
  };

  const armourClasses = [2, 5, 9, 10, 15, 22];

  const cases: TestCase[] = armourClasses.map((ac) => ({
    name: `ac:${ac} -> rendu correct`,
    armourClass: ac,
    input: formatArmourClassInput(ac),
  }));

  test.each(cases)("$name", ({ armourClass, input }) => {
    const { container } = render(<RichTextComponent text={input} />);

    const paragraph = container.querySelector("p");
    expect(paragraph?.textContent).toContain(
      `${armourClass}inventory.armourClass`,
    );

    expect(paragraph?.textContent).not.toContain("form.modifier");

    const image = screen
      .getAllByRole("img", { name: "armour-class-icon" })
      .find((img) => img.getAttribute("src") === armourClassIconLink);
    expect(image).toBeDefined();
  });
});

describe("Armour class - input that does not respect any pattern", () => {
  interface InvalidCase {
    name: string;
    input: string;
    expectedRawText: string;
  }

  const cases: InvalidCase[] = [
    {
      name: "Text armour class",
      input: "[ac:text]",
      expectedRawText: "[ac:text]",
    },
    {
      name: "Invalid attribute",
      input: "[ac:12+invalid]",
      expectedRawText: "[ac:12+invalid]",
    },
    {
      name: "Missing square brackets",
      input: "ac:12",
      expectedRawText: "ac:12",
    },
    {
      name: "Missing opening square bracket",
      input: "ac:12]",
      expectedRawText: "ac:12]",
    },
    {
      name: "Missing closing square bracket",
      input: "[ac:12",
      expectedRawText: "[ac:12",
    },
    {
      name: "Missing ':' separator",
      input: "[ac12]",
      expectedRawText: "[ac12]",
    },
    {
      name: "empty string",
      input: "",
      expectedRawText: "",
    },
    {
      name: "Text without any pattern",
      input: "Text without any pattern",
      expectedRawText: "Text without any pattern",
    },
  ];

  test.each(cases)(
    "$name — Text rendered as is",
    ({ input, expectedRawText }) => {
      render(<RichTextComponent text={input} />);

      // Le texte brut est affiché tel quel (si non vide)
      if (expectedRawText) {
        expect(screen.getByText(expectedRawText)).toBeInTheDocument();
      }
    },
  );
});
