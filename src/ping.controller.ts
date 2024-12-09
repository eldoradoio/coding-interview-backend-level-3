import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { Response as ResponseExpress } from 'express';

@Controller('ping')
export class PingController {
  constructor() {}

  @Get()
  async gting(@Res() res: ResponseExpress) {
    return res.send({ ok: true }).status(200);
  }
}
