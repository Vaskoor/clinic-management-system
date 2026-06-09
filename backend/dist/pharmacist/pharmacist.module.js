"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacistModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pharmacist_entity_1 = require("./pharmacist.entity");
const pharmacist_service_1 = require("./pharmacist.service");
const pharmacist_controller_1 = require("./pharmacist.controller");
let PharmacistModule = class PharmacistModule {
};
exports.PharmacistModule = PharmacistModule;
exports.PharmacistModule = PharmacistModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pharmacist_entity_1.Pharmacist])],
        providers: [pharmacist_service_1.PharmacistService],
        controllers: [pharmacist_controller_1.PharmacistController],
    })
], PharmacistModule);
//# sourceMappingURL=pharmacist.module.js.map