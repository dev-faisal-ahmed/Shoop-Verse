export type TFile = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
};

export type TUploadResult = { url: string; id: string };

export abstract class IFileUploader {
  abstract upload(file: TFile): Promise<TUploadResult>;
  abstract delete(id: string): Promise<void>;
}
