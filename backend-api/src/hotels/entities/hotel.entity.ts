import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column("simple-array", { nullable: true })
  picrure_list: string[];

}
export default Hotel;
