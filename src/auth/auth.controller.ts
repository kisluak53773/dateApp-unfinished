import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/common/middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/local/singin')
  @HttpCode(HttpStatus.OK)
  localSignin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.localSignin(dto);
  }

  @Public()
  @Post('local/signup')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './img',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  signupLocal(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() dto: AuthDto,
  ): Promise<Tokens> {
    return this.authService.localSignup(files, dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    return this.authService.refreshToken(userId, rt);
  }
}
