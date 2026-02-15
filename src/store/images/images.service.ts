import { from, map, Observable } from "rxjs";

import { API_ROUTES } from "@/api/api.routes";
import type { ImageResponseModel } from "./images.model";

class ImagesService {
  uploadImage = (file: File): Observable<ImageResponseModel> => {
    const formData = new FormData();
    formData.append("image", file);

    return from(API_ROUTES.POST_UPLOAD_IMAGE(formData)).pipe(
      map((response) => {
        return {
          url: import.meta.env.VITE_API_HOST + response.data.url,
        };
      }),
    );
  };
}

export const imagesService = new ImagesService();
