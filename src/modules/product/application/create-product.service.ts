import { Inject, Injectable } from '@nestjs/common';
import { FILE_UPLOADER_TOKEN } from 'src/common/tokens';
import { IFileUploader } from 'src/domain/shared/file-uploader.interface';

type TCreateProductService = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageFile: Express.Multer.File;
};

@Injectable()
export class CreateProductService {
  constructor(
    @Inject(FILE_UPLOADER_TOKEN) private fileUploader: IFileUploader,
  ) {}

  async execute(payload: TCreateProductService) {
    let imageUrl = '';
    if (payload.imageFile) {
      imageUrl = await this.fileUploader.upload(payload.imageFile);
      console.log('Image uploaded to:', imageUrl);
    }

    return { imageUrl };
  }
}
