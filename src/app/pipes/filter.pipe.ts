import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {

    const resultCustomer = [];
    for (const customer of value) {
      if (customer.customerFirstname.indexOf(arg) > -1 || customer.customerLastname.indexOf(arg) > -1) {
        resultCustomer.push(customer);
      }
    }
    return resultCustomer;
  }

}
