import { Injectable } from '@nestjs/common';
import { logHeadline } from 'src/log.functions';

@Injectable()
export class CheckNetworkAdaptersService {
  main() {
    logHeadline('Checking Network Adapters');
    console.log('Run i');
  }
}
