import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, url: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'React Markers',
      subject: 'Welcome to our App! Confirm your Email',
      html: `
        <div>
          <h1>For activate account</h1>
          <a href='${url}' >${url}</a>
        </div>
      `,
    });
  }
}
