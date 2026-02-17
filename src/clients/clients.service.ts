import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });

    if (existingClient) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createClientDto.password, 10);
    const client = this.clientRepository.create({
      ...createClientDto,
      password: hashedPassword,
    });

    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id_client: id },
      select: { id_client: true, razao_social: true, email: true, cnpj: true, address: true },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async findByEmail(
    email: string,
    selectPassword = false,
  ): Promise<Client | null> {
    const selectFields: Partial<Record<keyof Client, boolean>> = {
      id_client: true,
      razao_social: true,
      email: true,
      cnpj: true,
      address: true,
    };

    if (selectPassword) {
      selectFields.password = true;
    }

    const client = await this.clientRepository.findOne({
      where: { email },
      select: selectFields,
    });

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    if (updateClientDto.password) {
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        10,
      );
    }

    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
