var table = {
  "name": [],
  "club": [],
  "rating": []
};


var currentAttr = "Rating";
var currentPosition = "GK";

var attrDetect = 1;
var topTenIndexes = [];
var topTenDivs = ["#firstRatedPlayer", "#secondRatedPlayer", "#thirdRatedPlayer",
                  "#fourthRatedPlayer", "#fifthRatedPlayer", "#sixthRatedPlayer",
                  "#seventhRatedPlayer", "#eighthRatedPlayer", "#ninthRatedPlayer",
                  "#tenthRatedPlayer"];

var positionNames = ["GK", "CB" ,"LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM", "LM", "RM", "RW", "LW", "ST", "CF"];
var attrNames = ["Physical", "Shooting", "Dribbling", "Passing", "Pace", "Defense", "Rating", "Stamina", "Strength", "Jumping"
,"Volleys","Penalties", "Freekick Accuracy", "Curve", "Long Shot", "Finishing", "Shot Power", "Heading", "Attacking Position"
,"Ball Control", "Dribblingz", "Reaction", "Vision", "Crossing", "Short Pass", "Long Pass", "Acceleration", "Speed", "Agility"
,"Marking", "Sliding Tackle", "Standing Tackle", "Interceptions"];

var teamPickColorDecider = 0;
var highlyRatedColorDecider = 0;
var firstArgument = -1;
var secondArgument = -1;
var firstText, secondText;
function hello(){
    
};

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $window){

  var nameOfTheHover = "";

  
  hideInfo = function(){
    document.getElementById('tooltip-span').style.display = "none";
  };
  
  var currentLoadMore = 20;
  var currentHeightLoadMore = 600;

  var matrix = [,];

  
  document.getElementsByClassName("pickTeam")[0].addEventListener("click", pickTeamDiv);

  function pickTeamDiv() {
    document.getElementsByClassName("home")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementsByClassName("highlyRated")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementsByClassName("pickTeam")[0].getElementsByTagName("a")[0]
    .style.color = "#9fbba9";
    document.getElementById("DKKK")
    .style.color = "#fcfcfc";
    d3.select(".corDraw").select("svg").remove();
    if($scope.shownPlayers.length != 0){
      document.getElementsByClassName("rightSide")[0].style.display = "block";
    }
    else 
      document.getElementById("emptyTempDiv").style.display = "block";
    //document.getElementsByClassName("rightSide")[0].style.display = "block";
    document.getElementsByClassName("rightSide4")[0].style.display = "none";
    document.getElementsByClassName("rightSide3")[0].style.display = "none";
    document.getElementsByClassName("rightSide2")[0].style.display = "none";
    document.getElementsByClassName("teamCols")[0].style.display = "block";
    document.getElementsByClassName("shownPlayers")[0].style.display = "block";
    document.getElementsByClassName("sidenav")[0].style.height = "1170px";
  }

  
  document.getElementsByClassName("highlyRated")[0].addEventListener("click", highlyRatedDiv);
  
  function highlyRatedDiv() {
    
    document.getElementsByClassName("home")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementsByClassName("highlyRated")[0].getElementsByTagName("a")[0]
    .style.color = "#9fbba9";
    document.getElementsByClassName("pickTeam")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementById("DKKK")
    .style.color = "#fcfcfc";
    d3.select(".corDraw").select("svg").remove();
    document.getElementById("emptyTempDiv").style.display = "none";
    document.getElementsByClassName("rightSide")[0].style.display = "none";
    document.getElementsByClassName("rightSide2")[0].style.display = "block";
    document.getElementsByClassName("rightSide3")[0].style.display = "none";
    document.getElementsByClassName("rightSide4")[0].style.display = "none";
    document.getElementsByClassName("teamCols")[0].style.display = "none";
    document.getElementsByClassName("shownPlayers")[0].style.display = "none";
    document.getElementsByClassName("sidenav")[0].style.height = "auto";
  }
  
    document.getElementsByClassName("home")[0].addEventListener("click", homeDiv);
  

    function homeDiv() {
    document.getElementsByClassName("home")[0].getElementsByTagName("a")[0]
    .style.color = "#9fbba9";
    document.getElementsByClassName("highlyRated")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementsByClassName("pickTeam")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementById("DKKK")
    .style.color = "#fcfcfc";
    d3.select(".corDraw").select("svg").remove();
    document.getElementById("emptyTempDiv").style.display = "none";
    document.getElementsByClassName("rightSide")[0].style.display = "none";
    document.getElementsByClassName("rightSide2")[0].style.display = "none";
    document.getElementsByClassName("rightSide3")[0].style.display = "none";
    document.getElementsByClassName("rightSide4")[0].style.display = "block";
    document.getElementsByClassName("teamCols")[0].style.display = "none";
    document.getElementsByClassName("shownPlayers")[0].style.display = "none";
    document.getElementsByClassName("sidenav")[0].style.height = "auto";
  }

    
  document.getElementsByClassName("Correlation")[0].addEventListener("click", correlationDiv);

  function correlationDiv() {
    document.getElementsByClassName("home")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementById("DKKK")
    .style.color = "#9fbba9";
    document.getElementsByClassName("highlyRated")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementsByClassName("pickTeam")[0].getElementsByTagName("a")[0]
    .style.color = "#fcfcfc";
    document.getElementById("emptyTempDiv").style.display = "none";
    document.getElementsByClassName("rightSide")[0].style.display = "none";
    document.getElementsByClassName("rightSide2")[0].style.display = "none";
    document.getElementsByClassName("rightSide3")[0].style.display = "block";
    document.getElementsByClassName("rightSide4")[0].style.display = "none";
    document.getElementsByClassName("teamCols")[0].style.display = "none";
    document.getElementsByClassName("shownPlayers")[0].style.display = "none";
    document.getElementsByClassName("sidenav")[0].style.height = "auto";

    getCorrelation(firstArgument, secondArgument);

  }


  $(document).ready(function(){

  //var x = document.getElementsByClassName("rightSide");
  //x[0].style.display = 'none';
  //document.getElementsByClassName("rightSide2")[0].style.display = "none";
  //document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'grey';
  

  $.ajax({
   url:"newfullData.csv",
   dataType:"text",
   success:function(data)
   {
    var data = data.split(/\r?\n|\r/);
    for(var count = 0; count<data.length; count++)
    {
     var cell_data = data[count].split(",");
     matrix[count] = cell_data;
     if (count != 0){
     table.name[count-1] = cell_data[0];
     table.club[count-1] = cell_data[2];
     table.rating[count-1] = cell_data[6];
     }
    }

    
    $scope.clubs = table.club;
    $scope.players = table.name;
   }
  }).then(function(){
     document.getElementsByClassName("attrName")[6].style.backgroundColor = '#ef1722';
     document.getElementsByClassName("positionName")[0].style.backgroundColor = '#ef1722';
     topTwentyData = [];
     $scope.filterByposition(currentPosition, currentAttr);
     $scope.getTopFiftyFromPosition();
     setTimeout(
        function(){
        if(topTwentyData.length > 10)
        BarChart.draw(".drawingTheChartRightSide2", 1100, currentHeightLoadMore, 100, 0, topTwentyData)
        else BarChart.draw(".drawingTheChartRightSide2", 1100, 300, 100, 0, topTwentyData)
        }, 
        100);
  });
  });

  $scope.getInformation = function(x){
    nameOfTheHover = x.substr(3,x.length);
  };

  getInformation2 = function(event){
  setTimeout(function(){
    var x = event.clientX,
    y = event.clientY;

    
    var index = 0;
    for(var i = 0; i < matrix.length-1 ; i++){
      if(matrix[i][0] == nameOfTheHover)
        index = i;
    }
    

    var position = matrix[index][12];
    var age = matrix[index][11];
    var height = matrix[index][7];
    var weight = matrix[index][8];
    var rating = matrix[index][6];
    //var url =  "Pictures/" + nameOfTheHover + ".png";

    var tooltipSpan = document.getElementById('tooltip-span');
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x + 20) + 'px';
    tooltipSpan.style.display = "block";
    
    document.getElementById("playerInformation").innerHTML =  "Player Name: "  + nameOfTheHover
    + "<br/>" + "Age: " + age 
    + "<br/>" + "Player Position: " + position 
    + "<br/>" + "Player Height: " + height
    + "<br/>" + "Player Weight: " + weight 
    + "<br/>" + "Player Rating: " + rating;
    /*+ "<img src = " + " \" " +  url + " \" " + " width='50' height='50' >"*/

  }, 100); 
  };

  


  changeLoadMore = function(x){
    if (x==1) {
      currentLoadMore = currentLoadMore + 20;
      currentHeightLoadMore = currentHeightLoadMore + 600;
    }
    if(x==2){
      if(currentLoadMore != 20) {
        currentLoadMore = currentLoadMore - 20
        currentHeightLoadMore = currentHeightLoadMore - 600
      }; 
    }
    
    topTwentyData = [];

    $scope.filterByposition(currentPosition, currentAttr);
    $scope.getTopFiftyFromPosition();

    setTimeout(
      function(){
        if(topTwentyData.length > 10)
        BarChart.draw(".drawingTheChartRightSide2", 1100, currentHeightLoadMore, 100, 0, topTwentyData)
        else BarChart.draw(".drawingTheChartRightSide2", 1100, 300, 100, 0, topTwentyData)
      }, 
    100);

  }

 
   $scope.players = ["Wayne Rooney", "De Gea", "Chris Smalling", "Marcus Rojo"];

  $scope.shownPlayers = [];
  $scope.selectedPlayers = [];
  $scope.selectedPlayersRated = [];
  $scope.playersAttr = [];

  $scope.filtering = function(clubName, checked){


    // $window.alert(clubName);
    $scope.firstIndex = $scope.clubs.indexOf(clubName);
    //$window.alert($scope.firstIndex);
    $scope.lastIndex = $scope.firstIndex;
    
    for (club in $scope.clubs){
      if ($scope.clubs[club] == (clubName)){
        $scope.lastIndex = $scope.lastIndex + 1;
      }
    }

    $scope.lastIndex = $scope.lastIndex -1;
    // $window.alert($scope.lastIndex);

    $scope.edited3 = $scope.players.slice($scope.firstIndex, $scope.lastIndex);
    $scope.edited4 = table.rating.slice($scope.firstIndex, $scope.lastIndex);
    $scope.edited = [];
    $scope.edited5 = [];
    for(var i = 0; i<$scope.edited3.length; i++){
      var getTheIndex = $scope.players.indexOf($scope.edited3[i]);
      if(matrix[getTheIndex+1][12] != "GK"){
        $scope.edited.push($scope.edited3[i]);
        $scope.edited5.push($scope.edited4[i]);
      }
    }
    $scope.edited2 = [];

    for(i=0; i<($scope.edited.length); i ++){
      $scope.edited2[i] = $scope.edited5[i] + " " + $scope.edited[i];
    }

    if(checked == true){
      $scope.shownPlayers.push.apply($scope.shownPlayers, $scope.edited2);


    }else{
      for(i in $scope.edited2){
        var t = $scope.shownPlayers.indexOf($scope.edited2[i]);
        var y = $scope.selectedPlayersRated.indexOf($scope.edited2[i]);
        if(t != -1)
          $scope.shownPlayers.splice(t,1);
        

        if(y != -1)
          $scope.selectedPlayersRated.splice(y,1);
      }

      for(i in $scope.edited){
      var r = $scope.selectedPlayers.indexOf($scope.edited[i]);
        
        if(r != -1)
            $scope.selectedPlayers.splice(r,1);
          
      }

    if($scope.selectedPlayersRated.length == 0){
      
        document.getElementById("emptyTempDiv").style.display = "block";
        document.getElementsByClassName("rightSide")[0].style.display = "none";
        document.getElementsByClassName("sidenav")[0].style.height = "auto";
        //document.getElementsByClassName("rightSide2")[0].style.display = "block";
    }
    else{
      
    document.getElementById("emptyTempDiv").style.display = "none";
    $scope.getTopTen($scope.selectedPlayersRated);
    setTimeout(function(){
      $scope.EditToD3();
    }, 100);
    }
    
    }

  };

  $scope.ChoosePlayer = function(playerName, checked){
    

    var index = playerName.indexOf(" ");
    var playerrName = playerName.substring(index + 1, playerName.length);

    if(checked == true){
        $scope.selectedPlayersRated.push(playerName);
        $scope.selectedPlayers.push(playerrName);
    }else{
      var l = $scope.selectedPlayersRated.indexOf(playerName);
      if(l != -1){
    	   $scope.selectedPlayersRated.splice(l,1);
      }
      
      var t = $scope.selectedPlayers.indexOf(playerrName);
      if(t != -1){
    	   $scope.selectedPlayers.splice(t,1);
      }
    }
    var x = document.getElementsByClassName("rightSide");
    if($scope.selectedPlayers.length == 0){
      
      document.getElementById("emptyTempDiv").style.display = "block";
      x[0].style.display = "none";
      document.getElementsByClassName("sidenav")[0].style.height = "auto";
      //document.getElementsByClassName("rightSide2")[0].style.display = "block";
    }

    else{
      x[0].style.display = "block";
      document.getElementById("emptyTempDiv").style.display = "none";
      document.getElementsByClassName("rightSide4")[0].style.display = "none";
      document.getElementsByClassName("rightSide3")[0].style.display = "none";
      document.getElementsByClassName("rightSide2")[0].style.display = "none";
      $scope.getTopTen($scope.selectedPlayersRated);
      $scope.EditToD3();
    }

    $scope.DrawAttr(attrDetect);
    
  };
  

  $scope.EditToD3 = function(){

    var d = [];
    var b = [];
    $scope.playersAttr = [];
    $scope.physicalSkills = [];
    $scope.shootingSkills = [];
    $scope.dribblingSkills = [];
    $scope.passingSkills = [];
    $scope.paceSkills = [];
    $scope.defenseSkills = [];
    var ind = 0;
    for(i in $scope.selectedPlayers){
      ind = $scope.players.indexOf($scope.selectedPlayers[i]);
      ind = ind + 1;

      d = [
        {axis:"Physical", value:matrix[ind][50]/100},
        {axis:"Shooting", value:matrix[ind][51]/100},
        {axis:"Dribbling", value:matrix[ind][52]/100},
        {axis:"Passing", value:matrix[ind][53]/100},
        {axis:"Pace", value:matrix[ind][54]/100},
        {axis:"Defense", value:matrix[ind][55]/100}
      ];

      var t = {name: matrix[ind][0],
              Physical: matrix[ind][50], Shooting: matrix[ind][51],
              Dribbling: matrix[ind][52], Passing: matrix[ind][53],
              Pace: matrix[ind][54], Defense: matrix[ind][55]}

      b.push(t);
      $scope.playersAttr.push(d);
      
      var t = {name: matrix[ind][0],
              Stamina: matrix[ind][32], Strength: matrix[ind][33],
              Jumping: matrix[ind][36]}
      
      $scope.physicalSkills.push(t);


      var t = {name: matrix[ind][0],
              Volleys: matrix[ind][44], Penalties: matrix[ind][43],
              'Freekick Accuracy': matrix[ind][42], Curve: matrix[ind][41], 
              'Long Shot': matrix[ind][40], Finishing: matrix[ind][39], 
              'Shot Power': matrix[ind][38], Heading: matrix[ind][37],
              'Attacking Position': matrix[ind][23]}


      $scope.shootingSkills.push(t);

       var t = {name: matrix[ind][0],
              'Ball Control': matrix[ind][16], Dribbling: matrix[ind][17],
              Reaction: matrix[ind][22]}
      
      $scope.dribblingSkills.push(t);
      


       var t = {name: matrix[ind][0],
              Vision: matrix[ind][25], Crossing: matrix[ind][27],
              'Short Pass': matrix[ind][28], 'Long Pass': matrix[ind][29]}
      
      $scope.passingSkills.push(t);


       var t = {name: matrix[ind][0],
              Acceleration: matrix[ind][30], Speed: matrix[ind][31],
              Agility: matrix[ind][35]}
      
      $scope.paceSkills.push(t);


       var t = {name: matrix[ind][0],
              Marking: matrix[ind][18], 'Sliding Tackle': matrix[ind][19],
              'Standing Tackle': matrix[ind][20], Interceptions: matrix[ind][24]}
      
      $scope.defenseSkills.push(t);


    }

    

    var w = 440,
	  h = 440;

    var colorscale = d3.scale.category10();

    //Legend titles
    var LegendOptions = $scope.selectedPlayers;


    //Options for the Radar chart, other than default
    var mycfg = {
      w: w,
      h: h,
      maxValue: 1,
      levels: 10,
      ExtraWidthX: 280
    }

  
    //Call function to draw the Radar chart
    //Will expect that data is in %'s
    RadarChart.draw("#chart", $scope.playersAttr, mycfg, LegendOptions, 1);
    radarChartLegends.draw("#chart", w, h, LegendOptions, 280, 92, $scope.playersAttr);
    ParallelChart.draw("#paraChart", b, 540, 500, 25, -10, 0, 1);
    ParallelChart.draw("#PhyChart", $scope.physicalSkills, 650, 450, 55, 0, 0, 2);
    ParallelChart.draw("#ShoChart", $scope.shootingSkills, 1150, 450, 55, 0, 50, 2);
    ParallelChart.draw("#DriChart", $scope.dribblingSkills, 650, 450, 55, 0, 0, 2);
    ParallelChart.draw("#PasChart", $scope.passingSkills, 870, 450, 55, 0, 0, 2);
    ParallelChart.draw("#PacChart", $scope.paceSkills, 650, 450, 55, 0, 0, 2);
    ParallelChart.draw("#DefChart", $scope.defenseSkills, 870, 450, 55, 0, 0, 2);
    document.getElementById("ShoChart").style.display = "none";
    document.getElementById("DriChart").style.display = "none";
    document.getElementById("PasChart").style.display = "none";
    document.getElementById("PacChart").style.display = "none";
    document.getElementById("DefChart").style.display = "none";
    $scope.topTenDrawer();
    
    //edeitToD3 finish
  };


  $scope.DrawAttr = function(attrNum){
    if(attrNum == 1){
      document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'grey';
      document.getElementsByClassName("attrCol")[1].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[2].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[3].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[4].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[5].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementById("ShoChart").style.display = "none";
      document.getElementById("DriChart").style.display = "none";
      document.getElementById("PasChart").style.display = "none";
      document.getElementById("PacChart").style.display = "none";
      document.getElementById("DefChart").style.display = "none";
      document.getElementById("PhyChart").style.display = "block";
      attrDetect = 1;
    }

    if(attrNum == 2){
      document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[1].getElementsByTagName("a")[0].style.color = 'grey';
      document.getElementsByClassName("attrCol")[2].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[3].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[4].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[5].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementById("PhyChart").style.display = "none";
      document.getElementById("DriChart").style.display = "none";
      document.getElementById("PasChart").style.display = "none";
      document.getElementById("PacChart").style.display = "none";
      document.getElementById("DefChart").style.display = "none";
      document.getElementById("ShoChart").style.display = "block";
      attrDetect = 2;
    }

    if(attrNum == 3){
      document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[1].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[2].getElementsByTagName("a")[0].style.color = 'grey';
      document.getElementsByClassName("attrCol")[3].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[4].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[5].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementById("PhyChart").style.display = "none";
      document.getElementById("ShoChart").style.display = "none";
      document.getElementById("PasChart").style.display = "none";
      document.getElementById("PacChart").style.display = "none";
      document.getElementById("DefChart").style.display = "none";
      document.getElementById("DriChart").style.display = "block";
      attrDetect = 3;
    }

    if(attrNum == 4){
      document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[1].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[2].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[3].getElementsByTagName("a")[0].style.color = 'grey';
      document.getElementsByClassName("attrCol")[4].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[5].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementById("PhyChart").style.display = "none";
      document.getElementById("ShoChart").style.display = "none";
      document.getElementById("DriChart").style.display = "none";
      document.getElementById("PacChart").style.display = "none";
      document.getElementById("DefChart").style.display = "none";
      document.getElementById("PasChart").style.display = "block";
      attrDetect = 4;
    }

    if(attrNum == 5){
      document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[1].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[2].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[3].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[4].getElementsByTagName("a")[0].style.color = 'grey';
      document.getElementsByClassName("attrCol")[5].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementById("PhyChart").style.display = "none";
      document.getElementById("ShoChart").style.display = "none";
      document.getElementById("DriChart").style.display = "none";
      document.getElementById("PasChart").style.display = "none";
      document.getElementById("DefChart").style.display = "none";
      document.getElementById("PacChart").style.display = "block";
      attrDetect = 5;
    }

    if(attrNum == 6){
      document.getElementsByClassName("attrCol")[0].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[1].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[2].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[3].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[4].getElementsByTagName("a")[0].style.color = 'black';
      document.getElementsByClassName("attrCol")[5].getElementsByTagName("a")[0].style.color = 'grey';
      document.getElementById("PhyChart").style.display = "none";
      document.getElementById("ShoChart").style.display = "none";
      document.getElementById("DriChart").style.display = "none";
      document.getElementById("PasChart").style.display = "none";
      document.getElementById("PacChart").style.display = "none";
      document.getElementById("DefChart").style.display = "block";
      attrDetect = 6;
    }

  };


  $scope.getTopTen = function(array){
      topTenIndexes = [];
      var ratingArray = [];


      var maxIter = 0;
      if(array.length > 10){
        maxIter = 10;
      }

      else {maxIter = array.length};

      for (var i = 0; i < array.length ; i ++){
        var ratingIndex = array[i].indexOf(" ");
        var playerRating = array[i].substring(0, ratingIndex);
        ratingArray[i] = playerRating;
      }

      var ratingArray2 = [];

      for(i = 0; i < ratingArray.length ; i ++){
          ratingArray2[i] = parseInt(ratingArray[i]);
      }
      
      
      for(i = 0; i < maxIter ; i ++){

        var maximum = 0;

        for(var j = 0; j < ratingArray2.length; j ++){
         if(ratingArray2[j] > maximum){
           maximum = ratingArray2[j];}
        }

        var maxIndex = ratingArray2.indexOf(maximum);
        ratingArray2[maxIndex] = -1;
        topTenIndexes[i] = maxIndex;
      }


  };


  
  $scope.topTenDrawer = function(){
    
    if(topTenIndexes.length <= 3){
      document.getElementById("firstRatedGroup").style.display = "block";
      document.getElementById("secondRatedGroup").style.display = "none";
      document.getElementById("thirdRatedGroup").style.display = "none";
      document.getElementById("fourthRatedGroup").style.display = "none";
      document.getElementsByClassName("sidenav")[0].style.height = "1470px";  
    }

    else if(topTenIndexes.length > 3 && topTenIndexes.length <= 6){
      document.getElementById("firstRatedGroup").style.display = "block";
      document.getElementById("secondRatedGroup").style.display = "block";
      document.getElementById("thirdRatedGroup").style.display = "none";
      document.getElementById("fourthRatedGroup").style.display = "none";
            document.getElementsByClassName("sidenav")[0].style.height = "1790px";  

    }

    else if(topTenIndexes.length > 6 && topTenIndexes.length <= 9){
      document.getElementById("firstRatedGroup").style.display = "block";
      document.getElementById("secondRatedGroup").style.display = "block";
      document.getElementById("thirdRatedGroup").style.display = "block";
      document.getElementById("fourthRatedGroup").style.display = "none";
      document.getElementsByClassName("sidenav")[0].style.height = "2130px";
    }

    else{
      document.getElementById("firstRatedGroup").style.display = "block";
      document.getElementById("secondRatedGroup").style.display = "block";
      document.getElementById("thirdRatedGroup").style.display = "block";
      document.getElementById("fourthRatedGroup").style.display = "block";
      document.getElementsByClassName("sidenav")[0].style.height = "2470px";
    }

    var toptencfg = {
      w: 250,
      h: 250,
      maxValue: 1,
      levels: 10,
      factorLegend: .6,
      TranslateX: 40,	// padding to the right
	    TranslateY: 30,
      ExtraWidthX: 60,
	    ExtraWidthY: 60
    }

    $scope.toptenPlayersArray = [];
    $scope.toptenPlayersArrayAttr = [];
    
    for (var k = topTenIndexes.length; k < 10 ;k++){
      document.getElementById(topTenDivs[k].substr(1,topTenDivs[k].length)).style.display = "none";
    }

    for (var j = 0; j < topTenIndexes.length; j++){
      document.getElementById(topTenDivs[j].substr(1,topTenDivs[j].length)).style.display = "block";  
      $scope.toptenPlayersArray = [];
      $scope.toptenPlayersArrayAttr = [];
    
      $scope.toptenPlayersArray.push($scope.selectedPlayers[topTenIndexes[j]]);  
      $scope.toptenPlayersArrayAttr.push($scope.playersAttr[topTenIndexes[j]]);

      RadarChart.draw(topTenDivs[j], $scope.toptenPlayersArrayAttr, toptencfg, $scope.toptenPlayersArray, 2);
       document.getElementsByClassName("topTenPlayerName")[j].innerHTML = $scope.toptenPlayersArray[0];
    }

    

  };


  /*********************************** highly rated **************************************** */
  
  $scope.getHighlyByAttr = function(attr){
    currentAttr = attr;
   for(var i = 0; i < attrNames.length ; i++){
      if(attrNames.indexOf(attr) == i){
        document.getElementsByClassName("attrName")[i].style.backgroundColor = '#ef1722';
      }
      else{
      document.getElementsByClassName("attrName")[i].style.backgroundColor = '#9e2a3b';
    }
  }

  if(attr == "Stamina" || attr == "Strength" || attr == "Jumping"){
      document.getElementsByClassName("attrName")[0].style.backgroundColor = '#ef1722';
  }

  if(attr == "Volleys" || attr == "Penalties" || attr == "Freekick Accuracy" || attr == "Curve"
    || attr == "Long Shot" || attr == "Finishing" || attr == "Shot Power" || attr == "Heading" || attr == "Attacking Position"
  ){
    document.getElementsByClassName("attrName")[1].style.backgroundColor = '#ef1722';
  }

  if(attr == "Ball Control" || attr == "Dribblingz" || attr == "Reaction"){
    document.getElementsByClassName("attrName")[2].style.backgroundColor = '#ef1722';
  }


  if(attr == "Vision" || attr == "Crossing" || attr == "Short Pass" || attr == "Long Pass"){
    document.getElementsByClassName("attrName")[3].style.backgroundColor = '#ef1722';
  }

  if(attr == "Acceleration" || attr == "Speed" || attr == "Agility"){
    document.getElementsByClassName("attrName")[4].style.backgroundColor = '#ef1722';
  }

  if(attr == "Marking" || attr == "Sliding Tackle" || attr == "Standing Tackle" || attr == "Interceptions"){
    document.getElementsByClassName("attrName")[5].style.backgroundColor = '#ef1722';
  }

  if(attr == "Physical"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "block";
    document.getElementsByClassName("rightSide2ChooseShootingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "none";
  }

  if(attr == "Shooting"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseShootingSkills")[0].style.display = "block";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "none";
  }

  if(attr == "Dribbling"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseShootingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "block";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "none";
  }

  if(attr == "Passing"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseShootingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "block";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "none";
  }

  if(attr == "Pace"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseShootingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "block";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "none";
  }

  if(attr == "Defense"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "block";
  }

  if(attr == "Rating"){
    document.getElementsByClassName("rightSide2ChoosePhysicalSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseShootingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDribblingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePassingSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChoosePaceSkills")[0].style.display = "none";
    document.getElementsByClassName("rightSide2ChooseDefenseSkills")[0].style.display = "none";
  }
  
    topTwentyData = [];
    $scope.filterByposition(currentPosition, attr);
    $scope.getTopFiftyFromPosition();
    
    setTimeout(
      function(){
        if(topTwentyData.length > 10)
        BarChart.draw(".drawingTheChartRightSide2", 1100, currentHeightLoadMore, 100, 0, topTwentyData)
        else BarChart.draw(".drawingTheChartRightSide2", 1100, 300, 100, 0, topTwentyData)
      }, 
      100);

  }

  $scope.getHighlyByPosition = function(position, check){
   currentPosition = position;   
   var counter = 0; 
   for(var i = 0; i < positionNames.length ; i++){
      if(positionNames.indexOf(position) == i){
        document.getElementsByClassName("positionName")[i].style.backgroundColor = '#ef1722';
      }
      else{
      document.getElementsByClassName("positionName")[i].style.backgroundColor = '#9e2a3b';
      counter ++;
    }
    }
    if(counter >= 15){
      document.getElementsByClassName("positionName")[i].style.backgroundColor = '#ef1722';
    }
    else document.getElementsByClassName("positionName")[i].style.backgroundColor = '#9e2a3b'; 
    topTwentyData = [];
    
    setTimeout(
      function(){
        $scope.filterByposition(position, currentAttr);
        $scope.getTopFiftyFromPosition();
      },50
    )
    
    
    
    currentLoadMore = 20;
    currentHeightLoadMore = 600;

    setTimeout(
      function(){
        if(topTwentyData.length > 10)
        BarChart.draw(".drawingTheChartRightSide2", 1100, 600, 100, 0, topTwentyData, currentAttr)
        else BarChart.draw(".drawingTheChartRightSide2", 1100, 300, 100, 0, topTwentyData, currentAttr)
      }, 
      200);
  };

  $scope.filterByposition = function(position, attr){
    var x = 0;
    if(attr == "Marking") {x = 18}
    if(attr == "Sliding Tackle") {x = 19}
    if(attr == "Standing Tackle") {x = 20}
    if(attr == "Interceptions") {x = 24}
    if(attr == "Acceleration") {x = 30}
    if(attr == "Speed") {x = 31}
    if(attr == "Agility") {x = 35}
    if(attr == "Vision") {x = 25}
    if(attr == "Crossing") {x = 27}
    if(attr == "Short Pass") {x = 28}
    if(attr == "Long Pass") {x = 29}
    if(attr == "Ball Control") {x = 16}
    if(attr == "Dribblingz") {x = 17}
    if(attr == "Reaction") {x = 22}
    if(attr == "Attacking Position") {x = 23 }
    if(attr == "Heading") {x = 37 }
    if(attr == "Shot Power") {x = 38 }
    if(attr == "Finishing") {x = 39 }
    if(attr == "Long Shot") {x = 40 }
    if(attr == "Curve") {x = 41 }
    if(attr == "Freekick Accuracy") {x = 42}
    if(attr == "Penalties") {x = 43 }
    if(attr == "Volleys") { x = 44}
    if(attr == "Stamina"){  x = 32};
    if(attr == "Strength"){  x = 33};
    if(attr == "Jumping"){  x = 36};
    if(attr == "Physical"){  x = 50};
    if(attr == "Shooting"){  x = 51};
    if(attr == "Dribbling"){  x = 52};
    if(attr == "Passing"){  x = 53};
    if(attr == "Pace"){  x = 54};
    if(attr == "Defense"){  x = 55};
    if(attr == "Rating"){ x = 6};
    for(var i=0; i<matrix.length-1; i++){
      if(matrix[i][12].indexOf(position) != -1){
        t = {"name": matrix[i][0] , "value": matrix[i][x]}
        topTwentyData.push(t);
      }
    }
  }

  $scope.getTopFiftyFromPosition = function(){
    var temp = [];
    var topFiftyIndexes = [];
    for(var i = 0; i < topTwentyData.length; i++){
      temp[i] = topTwentyData[i].value;
    }
    
    
    for(var k = 0; k < temp.length; k++){
      temp[k] = parseInt(temp[k]);
    }
    var jj = Math.min(topTwentyData.length, currentLoadMore);
    for(var j = 0; j < jj; j++){
      var theMaximum = 0;
      for(var k = 0; k < temp.length; k++){
      if(temp[k] > theMaximum) {
        theMaximum = temp[k]
      };
    }
    
      var theIndex = temp.indexOf(theMaximum);
      topFiftyIndexes.push(theIndex);
      temp[theIndex] = -2;
    }

    var tempData = [];
    for(var k = 0; k < jj ; k ++){
      tempData[k] = topTwentyData[topFiftyIndexes[k]];
    }

    topTwentyData = [];
    topTwentyData = tempData;
  }




/*********************** Correlation Function ************************/


  getCorrelation = function(firstIndex, secondIndex){
    if(firstArgument != -1 && secondArgument != -1){
      document.getElementsByClassName("corLegend")[0].style.display = "block";
    var arrayOfData = [];

      var x = [];
      var y = [];
      var n = 926;
      var x_mean = 0;
      var y_mean = 0;
      var term1 = 0;
      var term2 = 0;
        // create x and y values
      for (var i = 1; i < n-1; i++) {
          if(matrix[i][12]!="GK"){
            x.push(parseInt(matrix[i][firstIndex]));
            y.push(parseInt(matrix[i][secondIndex]));
            x_mean += parseInt(matrix[i][firstIndex]);
            y_mean += parseInt(matrix[i][secondIndex]);
            }
      }
        // calculate mean x and y
        x_mean /= x.length;
        y_mean /= y.length;

        // calculate coefficients
        var xr = 0;
        var yr = 0;
        for (i = 0; i < x.length; i++) {
            xr = x[i] - x_mean;
            yr = y[i] - y_mean;
            term1 += xr * yr;
            term2 += xr * xr;

        }
        var b1 = term1 / term2;
        var b0 = y_mean - (b1 * x_mean);
        // perform regression 

        yhat = [];
        // fit line using coeffs
        for (i = 0; i < x.length; i++) {
            yhat.push(b0 + (x[i] * b1));
        }

        for (i = 0; i < y.length; i++) {
            arrayOfData.push({
                "yhat": yhat[i],
                "y": y[i],
                "x": x[i],
                "counter": 0
            })
        }
        for(i = 0; i < y.length; i++){
            for(j = 0; j < y.length; j ++){
                if(arrayOfData[i].x == arrayOfData[j].x && arrayOfData[i].y == arrayOfData[j].y){
                    arrayOfData[i].counter++;
                }
            }
        }


        var maximumCounter = 0;
        for(i = 0; i < arrayOfData.length; i++){
          if(arrayOfData[i].counter > maximumCounter) maximumCounter = arrayOfData[i].counter;
        }
            
        
        document.getElementsByClassName("corLegendIn")[1].innerHTML = " " + maximumCounter + " players";
        var minimum = {min:1000};
        getMinimumAtIndex(firstIndex, minimum);
        var maximum = {max:0};
        getMaximumAtIndex(firstIndex, maximum);

        var minimum2 = {min:1000};
        getMinimumAtIndex(secondIndex, minimum2);
        var maximum2 = {max:0};
        getMaximumAtIndex(secondIndex, maximum2);
        


        var ticksX = maximum.max - minimum.min + 1;
        var ticksY = maximum2.max - minimum2.min + 1;
        

    ScatPlotChart.draw(ticksX, ticksY, minimum2.min, arrayOfData);
  }
  else {
    
    document.getElementsByClassName("corLegend")[0].style.display = "none";
  }
  }
    

getMinimumAtIndex = function(index, mini){
  mini.min = parseInt(matrix[1][index]);
  for(var i = 2; i < matrix.length; i++){
      if(parseInt(matrix[i][index]) < mini.min && matrix[i][12] != "GK")
        mini.min = parseInt(matrix[i][index]);
  }
}

getMaximumAtIndex = function(index, maxi){
  maxi.max = parseInt(matrix[1][index]);
  for(var i = 2; i < matrix.length; i++){
      if(parseInt(matrix[i][index]) > maxi.max && matrix[i][12] != "GK")
        maxi.max = parseInt(matrix[i][index]);
  }
}



$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {

        setTimeout(function(){
            var temp = $styledSelect.text();
            if(temp == "Age"){
              firstArgument = 11;
              firstText = temp + "(years)";
            } 
            if(temp == "Height"){
              firstArgument = 7;
              firstText = temp + "(cm)";
              
            } 
            if(temp == "Weight"){
              firstArgument = 8;
              firstText = temp + "(kg)";
             
            } 
            if(temp == "Speed"){
              secondArgument = 31;
              secondText = temp;
            }
            if(temp == "Acceleration"){
              secondArgument = 30;
              secondText = temp;
            }
            if(temp == "Stamina"){
              secondArgument = 32;
              secondText = temp;
            }
            if(temp == "Jumping"){
              secondArgument = 36;
              secondText = temp;
            }
            if(temp == "Heading"){
              secondArgument = 37;
              secondText = temp;
            }
            if(temp == "Strength"){
              secondArgument = 33;
              secondText = temp;
            }
          if(firstArgument != -1 && secondArgument != -1){
          getCorrelation(firstArgument, secondArgument)
          $('.corYAxis').text(secondText);
          $('.corXAxis').text(firstText);
          }
        }
        ,20)

        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();

    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });



});


});


