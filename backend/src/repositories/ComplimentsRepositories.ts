import { EntityRepository, Repository } from "typeorm";
import Compliment from "../entities/Compliment";

@EntityRepository(Compliment)
export default class ComplimentsRepositories extends Repository<Compliment> {}
