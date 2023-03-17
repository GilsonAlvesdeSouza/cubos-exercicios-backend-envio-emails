import {container} from "tsyringe";
import IUserServices from "../../services/IUserServices";
import {UserServicesPG} from "../../services/UserServicesPG";
import {UserServicesMySQL} from "../../services/UserServicesMySQL";

container.registerSingleton<IUserServices>("UserServices", UserServicesPG);

