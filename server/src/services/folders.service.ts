import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Folder } from '../entities/folder.entity';

@Injectable()
export class FoldersService {

  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
  ) { }

  async create(user: User, folderName): Promise<Folder> {
    return this.foldersRepository.save(this.foldersRepository.create({
        name: folderName,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: user.organizationId,
    }));
  }

  async all(user: User): Promise<Folder[]> {

    return await this.foldersRepository.find({
        where: {
            organizationId: user.organizationId,
        },
        relations: ['folderApps'],
        order: {
            name: 'ASC'
        }
    });
  }
}