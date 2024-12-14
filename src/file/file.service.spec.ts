import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhoto } from '../testing/MockFuncoes/get_photo.mock';
import { FileServiceMock } from '../testing/MockServicos/file.service.mock';

describe('File Service', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService, FileServiceMock],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validar Definição', () => {
    expect(fileService).toBeDefined();
  });

  describe('Teste File Service', () => {
    test('Upload method', async () => {
      const photo = await getPhoto();

      await fileService.Upload(photo, 'photo-5-0.jpg');
    });
  });
});
