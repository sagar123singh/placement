const fs = require("fs")
const filename = process.argv[2]
const moment= require('moment')
const { main} = require("process")
let plans={          //given
    Music:{
    Free:{
        amount:0,
        time:1
    },
    Personal:{
        amount:100,
        time:1
    },
    Premium:{
        amount:250,
        time:3
    }
},
 Video:{
    Free:{
        amount:0,
        time:1
    },
    Personal:{
        amount:200,
        time:1
    },
    Premium:{
        amount:500,
        time:3
    }
},
Podcasts:{
    Free:{
        amount:0,
        time:1
    },
    Personal:{
        amount:100,
        time:1
    },
    Premium:{
        amount:350,
        time:3
    }
  }
}


let TopUp={                   //Given
    FourDevices:{
        amount:50,devices:4
    },
    TenDevices:{
        amount:100,devices:10
    }
}

let subPlans={}
let planList=[]
let totalPrices=0
let TopUpLists=[];


function streamingPlan(data){
    data=data.length.toString().split("\n")
    for(i=0;i<data.length;i++) {
        if(data){
            data=data[i].split(' ')
            switch(data[0]){
                case 'PurchaseSubscription':
                    addDate(data[1].trim());
                    break;
                    case 'AddSubscription':
                        subScrip(data[1],data[2]);
                        break;
                        case 'AddTopUp':
                            addTop(data[1],data[2]);
                            break;
                            case 'PrintRenewalDetails' :
                                printInfo()
                                break;
            }
        }
    }
}

function printInfo(){
    if(planList.length === 0){
        console.log('there is no any subscription ')
        return;
    }
    for(j=0;j<planList.length;j++){
        console.log('RenewalReminder' + planList[j].type+" " +planList[j].enDate);
    }
    console.log('RenewalAmount' + totalPrices);
}

data2= fs.readFileSync(process.argv[2]).toString();
const addTop= (device,num) =>{
    if(subPlans.date == 'null') {
        console.log('Add TopUP , enter date is invalid ,enter a valid date');
        return;
    }

    if(planList.length ===0){
        console.log('Add TopUP, subscription is not available')
        return;
    }

    let checkSubscription = TopUpLists.find(item=>item==device+'_'+num)
    if(checkSubscription){
        console.log('add TopUp, failed duplicate topUp');
        return;
    }
    let topUpInformation = TopUp[device];
    let topUpPrice= topUpInformation.amount * num;
    totalPrices += topUpPrice;
    TopUpLists.push(device+' '+num);
}

    function subscription(type,Plans){
        let planDetails=Plans[type];
        let month= planDetails[plans.trim()].time
        if(subPlans.date == 'null'){
            console.log("add subscription date is invalid");
            return;
        }

        let enDate= moment(subPlans.date, "DD-MM-YYYY").add(month, 'M').format('DD-MM-YYYY');
        let obj ={
            type,
            plans,
            startDate: subPlans.date,
            enDate: moment(enDate,"DD-MM-YYYY").subtract(10,'days').format('DD-MM-YYYY')
        }
        let checkSubscription= planList.find(item=>item.type.trim()== type.trim())
        if(checkSubscription){
            console.log('add subscription, failed duplicate category');
            return;
        }
        if(!checkSubscription){
            planList.push(obj);
            totalPrices= totalPrices+planDetails[plans.trim()].amount
        }
    }

    function addDate(dateStr){
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if(dateStr.match(regex)=== null){
            console.log('invalid date');
            subPlans.date='null';
            return 'null';
        }
        const [day,month,year]= dateStr.split('-');
        const isoFormattedString = `${year}-${month}-${day}`;
        const subsDate =new Date(isoFormattedString);
        const timeStamp = subsDate.getTime();
        if(typeOf(timeStamp) !== 'number' || Number.isNaN(timeStamp)){
            console.log('invalid date');
            subPlans.date='null';
            return 'null';
        }
        subPlans.date=dateStr;
    }
    main(data2)


    module.exports={ main }

// fs.readFile(filename, "utf8", (err, data) => {
//     /*if (err) throw err
//     var inputLines = data.toString().split("\n")
//     // Add your code here to process input commands
//     */
// })
