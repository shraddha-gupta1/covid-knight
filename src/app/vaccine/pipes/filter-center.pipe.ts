import { DOSE,VACCINES,AGE } from './../models/center.model';

import { Pipe, PipeTransform } from '@angular/core';
import { Center } from '../models/center.model';
@Pipe({
    name: 'filterCenter'
})
export class FilterCenterPipe implements PipeTransform {
 VACCINES=VACCINES;
  transform(centers: Center[], hospitalName: string,dose:string,vaccineType:any,age:string,activeDate:string): any {
    let doseType:string;
    if(dose == DOSE.DOSE1){
      doseType ='1';
    }else if(dose == DOSE.DOSE2){
      doseType = '2'
    }else if(dose == DOSE.ALL){
      doseType ='all'
    }
    return centers.filter((center:any) => {
        if(
          this.checkCenterName(center,hospitalName,activeDate) &&
          this.checkDoseType(center,doseType,activeDate) &&
          this.checkAge(center,age,activeDate) &&
          this.vaccineType(center,vaccineType,activeDate)
         ){
          return true
        }else{
          return false;
        }

    });
  }

    checkCenterName(center:any,centerName:string,activeDate:string){
      return center.name.toLowerCase().includes(centerName.toLocaleLowerCase());
    }

    checkAge(center:any,age:string,activeDate:string){
     return (age!='All Age'?(center[activeDate]?center[activeDate].minAgeLimit==parseInt(age):true):true)
    }
    checkDoseType(center:any,doseType:string,activeDate:string){
      return (doseType!='all'?(center[activeDate]?center[activeDate]['availableCapacityDose'+doseType]:true):true);
    }

    vaccineType(center:any,vaccineType:VACCINES,activeDate:string){


      return (vaccineType!='All'?(center[activeDate]?center[activeDate].vaccine===vaccineType:true):true);

    }
 }