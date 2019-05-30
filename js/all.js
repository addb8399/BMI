// 新增資料用
var check=document.querySelector(".BMI_check");
var dataList=JSON.parse(localStorage.getItem('BMIdata')) || [];
check.addEventListener("click",calculation,false)
check.addEventListener("click",buttonChange,false)

// 刪除資料用
var delet=document.querySelector(".content");
delet.addEventListener("click",deletData,false)

showdata();




function calculation(e){

    

    var BMIdata={};                                                     //資料-物件
    var height=document.querySelector(".height").value;                 //身高 
    var weight=document.querySelector(".weight").value;                 //體重
    var BMI=weight/((height/100)*(height/100));                         //BMI
    var BMILevel="";
    
    if(height==""||weight==""){return};
    
    switch(true){
        case(BMI < 18.5):
        BMILevel="過輕";
        break;
        case(BMI < 25):
        BMILevel="正常";
        break;
        case(BMI < 30):
        BMILevel="過重";
        break;
        case(BMI < 35):
        BMILevel="輕度肥胖";
        break;
        case(BMI < 40):
        BMILevel="中度肥胖";
        break;
        default:
        BMILevel="重度肥胖";
        break;
    }

    var BMIColor="";
    switch(true){
        case(BMI < 18.5):
        BMIColor="thin";
        break;
        case(BMI < 25):
        BMIColor="normal";
        break;
        case(BMI < 30):
        BMIColor="heavy";
        break;
        case(BMI < 35):
        BMIColor="littleFat";
        break;
        case(BMI < 40):
        BMIColor="midFat";
        break;
        default:
        BMIColor="tooFat";
        break;
    }


    var date=new Date();                                                //時間
    var timeMouth=(date.getMonth()+1<10 ?"0":"")+(date.getMonth()+1);   //時間-月
    var timeDate=(date.getDate()<10 ?"0":"")+(date.getDate());          //時間-日
    var timeYear=date.getFullYear();                                    //時間-年

    //新增資料-物件
    height=+height
    BMIdata.height=height.toFixed(0);
    weight=+weight;
    BMIdata.weight=+weight.toFixed(0);
    BMIdata.BMI=BMI.toFixed(2);
    BMIdata.BMILevel=BMILevel;
    BMIdata.BMIColor=BMIColor;
    BMIdata.time=timeMouth+"-"+timeDate+"-"+timeYear;

    //新增資料-矩陣
    dataList.push(BMIdata);
    
    var saveData=JSON.stringify(dataList)
    localStorage.setItem("BMIdata",saveData);


    showdata();
};


function buttonChange(e){
    if(e.target.dataset.value==0){

        var height=document.querySelector(".height").value;                 //身高 
        var weight=document.querySelector(".weight").value;                 //體重
        var BMI=weight/((height/100)*(height/100));                         //BMI
        var BMILevel="";
    
        if(height==""||weight==""){return};


        var length=dataList.length
        data=length-1
        
        var el=document.querySelector(".star_value");
        el.innerHTML="";

        var el_div=document.createElement("div");
        el_div.setAttribute("class","BMIvalue div_"+dataList[data].BMIColor);
        document.querySelector(".star_value").appendChild(el_div);

        var el_p_name=document.createElement("p");
        el_p_name.textContent=dataList[data].BMILevel;
        el_p_name.setAttribute("class","level_name name_"+dataList[data].BMIColor);
        document.querySelector(".star_value").appendChild(el_p_name);


        var el_p_value=document.createElement("p");
        el_p_value.textContent=dataList[data].BMI;
        el_p_value.setAttribute("class","value p_"+dataList[data].BMIColor);
        document.querySelector(".BMIvalue").appendChild(el_p_value);

        var el_p_word=document.createElement("p");
        el_p_word.textContent="BMI";
        el_p_word.setAttribute("class","BMIword p_"+dataList[data].BMIColor);
        document.querySelector(".BMIvalue").appendChild(el_p_word);

        var el_bottom=document.createElement("botton");
        el_bottom.setAttribute("class","BMI_reset_bg btn_bg_"+dataList[data].BMIColor);
        document.querySelector(".BMIvalue").appendChild(el_bottom);

        var el_bottom_img=document.createElement("img");
        el_bottom_img.setAttribute("class","BMI_reset btn_"+dataList[data].BMIColor);
        el_bottom_img.setAttribute("src","img/icons_loop.png");
        document.querySelector(".BMI_reset_bg").appendChild(el_bottom_img);

        var buttonChangeReset=document.querySelector(".BMI_reset_bg")
        buttonChangeReset.addEventListener("click",buttonChange,false)

        return

    };

    var height=document.querySelector(".BMI_input .height"); 
    height.value="";               
    var weight=document.querySelector(".BMI_input .weight");
    weight.value="";

    var el=document.querySelector(".star_value");
    el.innerHTML="";
    var el_bottom=document.createElement("button");
    el_bottom.textContent="看結果";
    el_bottom.setAttribute("class","BMI_check");
    el_bottom.setAttribute("data-value","0");
    document.querySelector(".star_value").appendChild(el_bottom);

    var check=document.querySelector(".BMI_check");
    check.addEventListener("click",calculation,false)
    check.addEventListener("click",buttonChange,false)

};


function showdata(e){

    
    var BMIdata=dataList;
    var Length=BMIdata.length;
    document.querySelector(".data_list").innerHTML="";

    for(var i=0;i<Length;i++){

    

    // 新增LI
    var dataBlock=document.createElement('li');             
    dataBlock.setAttribute("class","data_block"+i);
    document.querySelector(".data_list").appendChild(dataBlock);

    // 新增等級顏色區塊
    var levelColor=document.createElement('div');
    levelColor.setAttribute("class",BMIdata[i].BMIColor);
    document.querySelector(".data_block"+i).appendChild(levelColor);

    // 新增等級標籤
    var levelName=document.createElement('p');
    levelName.textContent=BMIdata[i].BMILevel;
    levelName.setAttribute("class","level_name");
    document.querySelector(".data_block"+i).appendChild(levelName);



    // 新增BMI Item
    var BMItitle=document.createElement('p');
    BMItitle.textContent="BMI";
    BMItitle.setAttribute("class","item");
    document.querySelector(".data_block"+i).appendChild(BMItitle);
    // 新增BMI Value
    var BMIvalue=document.createElement('p');
    BMIvalue.textContent=BMIdata[i].BMI;
    BMIvalue.setAttribute("class","value");
    document.querySelector(".data_block"+i).appendChild(BMIvalue);
    


    // 新增體重 Item
    var weithtTitle=document.createElement('p');
    weithtTitle.textContent="weight";
    weithtTitle.setAttribute("class","item");
    document.querySelector(".data_block"+i).appendChild(weithtTitle);
    // 新增體重 Value
    var weightValue=document.createElement('p');
    weightValue.textContent=BMIdata[i].weight+"kg";
    weightValue.setAttribute("class","value");
    document.querySelector(".data_block"+i).appendChild(weightValue);



    // 新增身高 Item
    var heightTitle=document.createElement('p');
    heightTitle.textContent="height";
    heightTitle.setAttribute("class","item");
    document.querySelector(".data_block"+i).appendChild(heightTitle);
    // 新增身高 Value
    var heightValue=document.createElement('p');
    heightValue.textContent=BMIdata[i].height+"cm";
    heightValue.setAttribute("class","value");
    document.querySelector(".data_block"+i).appendChild(heightValue);



    // 新增時間 Value
    var timeValue=document.createElement('p');
    timeValue.textContent=BMIdata[i].time;
    timeValue.setAttribute("class","time");
    document.querySelector(".data_block"+i).appendChild(timeValue);


    // 新增 DeletIcon
    var deletA=document.createElement('a');
    deletA.setAttribute("href","#");
    deletA.setAttribute("class","delet");
    document.querySelector(".data_block"+i).appendChild(deletA);
    var deletI=document.createElement('i');
    deletI.setAttribute("class","fas fa-trash-alt");
    deletI.setAttribute("data-num",i);
    document.querySelector(".data_block"+i+" .delet").appendChild(deletI);
    }

    

};


function deletData(e){

    if(e.target.nodeName!=="I"){return};
    num=e.target.dataset.num;
    dataList.splice(num,1);
    var saveData=JSON.stringify(dataList)
    localStorage.setItem("BMIdata",saveData);
    showdata();

};


