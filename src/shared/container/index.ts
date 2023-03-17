import {container} from "tsyringe";
import IUserServices from "../../services/IUserServices";
import {UserServices} from "../../services/UserServices";

container.registerSingleton<IUserServices>("UserServices", UserServices);
