import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { XFieldsService } from "./xfields.service";
import { UpdateXFieldDto } from "./dto/update-xfield.dto";

@Controller("xfields")
export class XFieldsController {
  constructor(private XFieldsService: XFieldsService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  saveXFields(@Body() XFields: UpdateXFieldDto) {
    return this.XFieldsService.saveXFields(XFields);
  }

  @Get()
  getAll() {
    return this.XFieldsService.getAll();
  }
}
