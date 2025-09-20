export type TFile = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
};

export abstract class IFileUploader {
  abstract upload(file: TFile): Promise<string>;
}
