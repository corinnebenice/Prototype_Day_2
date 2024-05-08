let treecover;
let treeloss;

let table_treeloss;

let font;

const loss_year = [];
const loss_iso = [];
const loss_countries = [];
const loss_treeloss = [];
const loss_fireloss = [];

let table_cover;
const countrynames = [];

const cover_year = [];
const cover_iso = [];
const cover_countries = [];
const cover_tree = [];
const cover_area = [];

const countryData = [];
const countryData2 = [];
const countriesData = [];
const countryGainData = [];

var other = [];
var outside = [];

var currentCountryObject;

let combinedCountries = [];

let selectedcountry;

let o = 0;

var fallenblocks = 0;

var treearea = 0;

var j = 0;
var k = 0;

let ax = 0;
var drawlines = 0;

let grid;
let w = 10;
let cols, rows;

let makewhite = false;

var circles = [];

let pos, colors;
var moveSpeed = 0.8;
const moveScale = 200;

var oldselectedcountry;
var oldnumber = 0;

let mouseslide = 0;


function preload() {
  treecover = loadTable("tree_cover.csv", "csv", "header");
  treeloss = loadTable("tree_loss.csv", "csv", "header");
  treegain = loadTable("tree_gain_2000-2020.csv", "csv", "header");

  font = loadFont("NeutralStd-Regular.otf");

  // font = loadFont("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  treecover.rows.forEach((el) => {
    countryData.push(new Country(el));
  });

  treeloss.rows.forEach((el) => {
    countryData2.push(new Country2(el));
  });

  treegain.rows.forEach((el) => {
    countryGainData.push(new CountryGain(el));
  });


  var firstone = {
    a: 0,
    b: 0,
    c: 0,
  };
  other.push(firstone);
  // console.log(other);

  datacombiner();

  // THE DRAWING ----------------------------------------------------------------

  var protection = 0;

  for (let o = 0; o < 212; o++) {

    //212 is totaal
    selectedcountry = countrynames[o];

    currentCountryObject = countryData2.filter(
      (el) => el.country_name == selectedcountry
    );

    const data = {
      tree_cover:
        countryData.filter((el) => el.country_name == selectedcountry)[0]
          .tree_cover * 1,
      country_area:
        countryData.filter((el) => el.country_name == selectedcountry)[0]
          .country_area_ha * 1,
      tree_gain:
        countryGainData.filter((el) => el.country_name == selectedcountry)[0]
          .tree_gain * 1,
    };
    // console.log(data);
    currentCountryObject.push(data);
    // console.log(data);
    // console.log(currentCountryObject);

    size = currentCountryObject.filter((obj) => obj.tree_cover)[0].tree_cover;
    countrysize = currentCountryObject.filter((obj) => obj.country_area)[0]
      .country_area;

    gainX = currentCountryObject.filter((obj) => obj.tree_gain)[0].tree_gain;

    const data2 = {
      name: selectedcountry,
      gain: gainX
    }
    // outside.push(selectedcountry, gainX);
    outside.push(data2);

    //inner circles
    for (let i = 0; i < currentCountryObject.length - 1; i++) {

      j = j + currentCountryObject.filter((el) => el.tree_loss)[i].tree_loss;
      k = currentCountryObject.filter((obj) => obj.tree_cover)[0].tree_cover;
    }
  }

  console.log(countrynames);
  countrynames.sort();
  console.log(countrynames);

  console.log(outside);

  // currentCountryObject.sort((a, b) => {
  //   const nameA = a.country_name; // ignore upper and lowercase
  //   const nameB = b.country_name; // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }

  //   // names must be equal
  //   return 0;
  // });

  noStroke();
  colors = [color("#406928"), color("#A3C945"), color("#1F4F6F"), color("#339798"), color("#52BC8F"), color("#76DB8F"), color("#C7EAC9")];
  pos = [];
  for (let i = 10; i < 100000; i++) {
    pos.push({
      x: random(width),
      y: random(height),
      c: colors[floor(random(colors.length))]
    });
  }

  fill('#F5F5F5');
  rect(0, 20, windowWidth, 50);
  textSize(15);
  fill(0);
  var alpha_a = 50;
  text("A", windowWidth * 0.015, alpha_a);
  text("B", windowWidth * 0.08, alpha_a);
  text("C", windowWidth * 0.16, alpha_a);
  text("D", windowWidth * 0.24, alpha_a);
  text("E", windowWidth * 0.27, alpha_a);
  text("F", windowWidth * 0.30, alpha_a);
  text("G", windowWidth * 0.32, alpha_a);
  text("H", windowWidth * 0.39, alpha_a);
  text("I", windowWidth * 0.41, alpha_a);
  text("J", windowWidth * 0.45, alpha_a);
  text("K", windowWidth * 0.47, alpha_a);
  text("L", windowWidth * 0.49, alpha_a);
  text("M", windowWidth * 0.53, alpha_a);
  text("N", windowWidth * 0.63, alpha_a);
  text("P", windowWidth * 0.68, alpha_a);
  text("R", windowWidth * 0.72, alpha_a);
  text("S", windowWidth * 0.75, alpha_a);
  text("T", windowWidth * 0.89, alpha_a);
  text("U", windowWidth * 0.93, alpha_a);
  text("V", windowWidth * 0.96, alpha_a);
  text("Y", windowWidth * 0.987, alpha_a);
  text("Z", windowWidth * 0.99, alpha_a);

  textSize(80);
  fill(0);
  text("Growth of " + selectedcountry, 50, 180);

}

// FUNCTION DRAW ------------------------------------------------------------------

function draw() {
  textFont(font);

  if (mouseY > 19 && mouseY < 71) {
    mouseslide = mouseX / windowWidth * 211;
  }
  let nbrmouse = round(mouseslide);

  selectedcountry = countrynames[nbrmouse];
  textSize(80);

  // blocksamount = outside[nbrmouse] / 100;

  blocksamount = (outside.filter((el) => el.name == selectedcountry)[0].gain * 1)/1000;
  // blocksamount = 400;

  // moveSpeed = (outside.filter((el) => el.name == selectedcountry)[0].gain * 1)/10000;

  // console.log(outside.filter((el) => el.name == selectedcountry)[0]);

  for (ax = 0; ax <= drawlines - 1; ax++) {
    with (pos[ax]) {
      let angle = noise(x / moveScale, y / moveScale) * TWO_PI * moveScale;//
      x += cos(angle) * moveSpeed;
      y += sin(angle) * moveSpeed;
      fill(c);
      ellipse(x, y, 2, 2);
      // if(x > width || x < 0 || y > height || y < 0 || random(1) < 0.008){
      // 	x = random(width);
      // 	y = random(height);
      // }
    }
  }

  console.log((outside.filter((el) => el.name == selectedcountry)[0].gain * 1)/1000);


  if (nbrmouse != oldnumber) {
    makewhite = true;
    oldnumber = nbrmouse;
  }

  if (makewhite == true) {
    // console.log("true!");

    drawlines = blocksamount;
    drawlines = Math.floor(drawlines);
    if (drawlines < 1) {
      drawlines = 1;
    }
    pos = [];
    ax = 0;

    for (let i = 1; i < 100000; i++) {
      pos.push({
        x: random(width),
        y: random(height),
        c: colors[floor(random(colors.length))]
      });
    }
    background(255);
    fill('#F5F5F5');
    rect(0, 20, windowWidth, 50);
    textSize(15);
    fill(0);
    var alpha_a = 50;
    text("A", windowWidth * 0.015, alpha_a);
    text("B", windowWidth * 0.08, alpha_a);
    text("C", windowWidth * 0.16, alpha_a);
    text("D", windowWidth * 0.24, alpha_a);
    text("E", windowWidth * 0.27, alpha_a);
    text("F", windowWidth * 0.30, alpha_a);
    text("G", windowWidth * 0.32, alpha_a);
    text("H", windowWidth * 0.39, alpha_a);
    text("I", windowWidth * 0.41, alpha_a);
    text("J", windowWidth * 0.45, alpha_a);
    text("K", windowWidth * 0.47, alpha_a);
    text("L", windowWidth * 0.49, alpha_a);
    text("M", windowWidth * 0.53, alpha_a);
    text("N", windowWidth * 0.63, alpha_a);
    text("P", windowWidth * 0.68, alpha_a);
    text("R", windowWidth * 0.72, alpha_a);
    text("S", windowWidth * 0.75, alpha_a);
    text("T", windowWidth * 0.89, alpha_a);
    text("U", windowWidth * 0.93, alpha_a);
    text("V", windowWidth * 0.96, alpha_a);
    text("Y", windowWidth * 0.987, alpha_a);
    text("Z", windowWidth * 0.99, alpha_a);

    textSize(80);
    fill(0);
    text("Growth of " + selectedcountry, 50, 180);
    makewhite = false;
  }

  // console.log(selectedcountry, outside);

  // console.log(mouseX / windowWidth * 100);

  // if (nbrmouse = !oldnumber && nbrmouse > 0) {
  //   oldnumber = nbrmouse;
  //   // console.log("Hi");
  //   background(255);
  //   oldselectedcountry = selectedcountry;
  // }


  // r = sqrt(blocksamount/PI);
  // circle(mouseX, mouseY,r);

  // function mouseClicked() {
  // if (value === 0){
  // const data = {X: mouseX, Y: mouseY, R: r};
  // circles.push(data);
  // }
  // }


  // console.log(circles);

  // for (var i = 0; i < circles.length; i++){
  //   // stroke('grey');
  //   // strokeWeight(2);
  //   // noFill();
  //   circle[circles[i].X, circles[i].Y, circles[i].R];
  // }
  // for (var i = 0; i < circles.length; i++) {
  //   circle(circles[i].X, circles[i].Y, circles[i].R);
  // }

}

// function mouseClicked() {
//   r = sqrt(blocksamount/PI);
//   const data = {
//     X: mouseX,
//     Y: mouseY,
//     R: r
//   }
//     circles.push(data);
// }


// DATA STUFF ------------------------------------------------------------------

class Country {
  constructor(dataArray) {
    this.iso = dataArray.arr[0];
    this.country_name = dataArray.arr[1];
    this.yr = dataArray.arr[2] * 1;
    this.tree_cover = dataArray.arr[3] * 1;
    this.country_area_ha = dataArray.arr[4] * 1;
  }
}

class Country2 {
  constructor(dataArray) {
    this.iso = dataArray.arr[0];
    this.country_name = dataArray.arr[1];
    this.yr = dataArray.arr[2] * 1;
    this.tree_loss = dataArray.arr[3] * 1;
    this.tree_loss_fire = dataArray.arr[4] * 1;
    this.tree_cover = 0;
    this.country_area = 0;
    this.tree_gain = 0;
  }
}

class CountryGain {
  constructor(dataArray) {
    this.iso = dataArray.arr[0];
    this.tree_gain = dataArray.arr[1] * 1;
    this.tree_cover = dataArray.arr[2] * 1;
    this.country_name = dataArray.arr[3];
  }
}

function datacombiner() {

  // countryData.sort(function (a, b) {
  //   return a.country_area_ha - b.country_area_ha;
  // });

  countryData.forEach((el) => countrynames.push(el.country_name));
  // console.log(countrynames);
}



