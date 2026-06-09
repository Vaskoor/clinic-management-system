import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pharmacist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  licenseNumber: string;
}
