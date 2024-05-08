let treecover;
let treeloss;
let testfile;

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
const testdata = [];

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
var draw_boreal = 0;
var draw_tropical = 0;
var draw_temperal = 0;
var draw_subtrop = 0;

let pos_boreal = [];
let pos_subtrop = [];
let pos_temperal = [];
let pos_tropical = [];

let makewhite = false;

var circles = [];

let pos, colors;
let colors_tundra, colors_taiga, colors_deciduous, colors_desert, colors_steppe, colors_savanna, colors_med;
let colors_boreal, colors_temperal, colors_tropical, colors_subtropical, colors_growth;
var moveSpeed = 0.3;
const moveScale = 800;
// var moveScale = 0;
var scaletest = 0;
var movescaleSize = 0;

var oldselectedcountry;
var oldnumber = 0;

let mouseslide = 0;

var tree_area;

var minforest, maxforest;
var ellipseSize;
var amount_boreal, amount_subtrop, amount_temperal, amount_tropical, amount_growth;


function preload() {
  treecover = loadTable("tree_cover.csv", "csv", "header");
  treeloss = loadTable("tree_loss.csv", "csv", "header");
  treegain = loadTable("tree_gain_2000-2020.csv", "csv", "header");

  testfile = loadTable("tree_cover_filtered.csv", "csv", "header");

  font = loadFont("NeutralStd-Regular.otf");

  img = loadImage('arrow.png');

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

  testfile.rows.forEach((el) => {
    testdata.push(new testobj(el));
  });


  var firstone = {
    a: 0,
    b: 0,
    c: 0,
  };
  other.push(firstone);
  // console.log(other);

  datacombiner();

  console.log(testdata);

  // THE DRAWING ----------------------------------------------------------------

  var protection = 0;

  for (let o = 0; o < 202; o++) {

    //212 is totaal
    selectedcountry = countrynames[o];

    // currentCountryObject = countryData2.filter(
    //   (el) => el.country_name == selectedcountry
    // );

    // const data = {
    //   tree_cover:
    //     countryData.filter((el) => el.country_name == selectedcountry)[0]
    //       .tree_cover * 1,
    //   country_area:
    //     countryData.filter((el) => el.country_name == selectedcountry)[0]
    //       .country_area_ha * 1,
    //   tree_gain:
    //     countryGainData.filter((el) => el.country_name == selectedcountry)[0]
    //       .tree_gain * 1,
    // };
    // // console.log(data);
    // currentCountryObject.push(data);
    // // console.log(data);
    // // console.log(currentCountryObject);

    currentCountryObject = testdata.filter(
      (el) => el.country_name == selectedcountry
    );

    // console.log(currentCountryObject);
    // console.log(o);

    const data = {
      tree_cover:
        testdata.filter((el) => el.country_name == selectedcountry)[0]
          .tree_cover * 1,
      country_area:
        testdata.filter((el) => el.country_name == selectedcountry)[0]
          .country_area_ha * 1,
      tree_gain:
        countryGainData.filter((el) => el.country_name == selectedcountry)[0]
          .tree_gain * 1,
      // boreal:
      //   testdata.filter((el) => el.country_name == selectedcountry)[0]
      //     .boreal_ha * 1,
      // subtropics:
      //   testdata.filter((el) => el.country_name == selectedcountry)[0]
      //     .subtropical_ha * 1,
      // temperate:
      //   testdata.filter((el) => el.country_name == selectedcountry)[0]
      //     .temperate_ha * 1,
      // tropical:
      //   testdata.filter((el) => el.country_name == selectedcountry)[0]
      //     .tropical_ha * 1,
    };
    // console.log(data);
    currentCountryObject.push(data);
    // console.log(data);
    // console.log(currentCountryObject);

    size = currentCountryObject.filter((obj) => obj.country_area)[0].country_area;
    // console.log(size);
    // countrysize = currentCountryObject.filter((obj) => obj.country_area)[1]
    //   .country_area;

    gainX = currentCountryObject.filter((obj) => obj.tree_gain)[0].tree_gain;
    tree_area = currentCountryObject.filter((obj) => obj.tree_cover)[0].tree_cover;
    // console.log(tree_area);

    // console.log(currentCountryObject.boreal);
    // console.log(currentCountryObject.filter((obj) => obj.temperate)[0].temperate);

    // temperate_area = currentCountryObject.filter((obj) => obj.temperate_ha)[0].temperate_ha;
    // boreal_area = currentCountryObject.filter((obj) => obj.boreal_ha)[0].boreal_ha;
    // subtrop_area = currentCountryObject.filter((obj) => obj.subtropical_ha)[0].subtropical_ha;
    // tropical_area = currentCountryObject.filter((obj) => obj.tropical_ha)[0].tropical_ha;
    boreal_area = testdata.filter((el) => el.country_name == selectedcountry)[0].boreal_ha * 1;
    subtrop_area = testdata.filter((el) => el.country_name == selectedcountry)[0].subtropical_ha * 1;
    temperate_area = testdata.filter((el) => el.country_name == selectedcountry)[0].temperate_ha * 1;
    tropical_area = testdata.filter((el) => el.country_name == selectedcountry)[0].tropical_ha * 1;
    // console.log(boreal_area, subtrop_area, tropical_area, temperate_area);

    // const data2 = {
    //   name: selectedcountry,
    //   gain: gainX,
    //   country_size: countrysize,
    //   forest_area: tree_area
    // }

    const data2 = {
      name: selectedcountry,
      country_size: size,
      forest_area: tree_area,
      boreal: boreal_area,
      subtropics: subtrop_area,
      tropics: tropical_area,
      temperate: temperate_area,
      gain: gainX
    }

    // outside.push(selectedcountry, gainX);
    outside.push(data2);

    //inner circles
    // for (let i = 0; i < currentCountryObject.length - 1; i++) {

    //   j = j + currentCountryObject.filter((el) => el.tree_loss)[i].tree_loss;
    //   k = currentCountryObject.filter((obj) => obj.tree_cover)[0].tree_cover;
    // }
  }

  // console.log(countrynames);
  countrynames.sort();
  // console.log(countrynames);

  // console.log(outside);


  noStroke();
  colors = [color("#406928"), color("#A3C945"), color("#1F4F6F"), color("#339798"), color("#52BC8F"), color("#76DB8F"), color("#C7EAC9")];
  // colors_tundra = [color("#A31B18"), color("#DBCF80"), color("#54583E"), color("#2E4E06")];
  // colors_taiga = [color("#6da35a"), color("#181d25"), color("#524736"), color("#61692f")];
  // colors_deciduous = [color("#e78e2a"), color("#a31b18"), color("#80b31d"), color("#eec02b")];
  // colors_desert = [color("#b86528"), color("#e78e2a"), color("#ffcb68"), color("#9d8f32")];
  // colors_tropical = [color("#a31b18"), color("#dbcf80"), color("#54583e"), color("#2e4e06")];
  // colors_steppe = [color("#a31b18"), color("#dbcf80"), color("#54583e"), color("#2e4e06")];
  // colors_savanna = [color("#a31b18"), color("#dbcf80"), color("#54583e"), color("#2e4e06")];
  // colors_med = [color("#a31b18"), color("#dbcf80"), color("#54583e"), color("#2e4e06")];

  colors_temperal = [color("#e78e2a"), color("#a31b18"), color("#80b31d"), color("#eec02b")];
  colors_boreal = [color("#6da35a"), color("#181d25"), color("#524736"), color("#61692f")];
  colors_tropical = [color("#a31b18"), color("#dbcf80"), color("#54583e"), color("#2e4e06")];
  colors_subtropical = [color("#bca244"), color("#61692f"), color("#a3a130"), color("#858c50")];

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

  // textSize(80);
  fill(0);
  // text(selectedcountry, 50, 180);

  push();
  scale(0.3);
  image(img, windowWidth*2.3, windowHeight*0.7);
  pop();

  textAlign(CENTER);
  textSize(60);
  text("Forest area per country", windowWidth / 2, (windowHeight / 2)-40);
  textSize(40);
  text("Scroll the grey bar to navigate between countries", windowWidth / 2, (windowHeight / 2)+20);

  textAlign(LEFT);
  textSize(20);
  text("Pro tip: try to find Russia and your home country!", 100, 150);

  console.log(outside);

  minforest = outside.reduce((acc, cur) => acc.forest_area < cur.forest_area ? acc : cur);
  // maxforest = outside.reduce((acc, cur) => acc.forest_area > cur.forest_area ? acc : cur);
  maxforest = 199281686.5;
  console.log(minforest, maxforest);


}


// FUNCTION DRAW ------------------------------------------------------------------

function draw() {
  textAlign(LEFT);
  textFont(font);

  if (mouseY > 19 && mouseY < 71) {
    mouseslide = mouseX / windowWidth * 211;
  }
  let nbrmouse = round(mouseslide);

  // nbrmouse = 20;

  selectedcountry = countrynames[nbrmouse];
  textSize(80);

  // var filteredcountry = outside.filter((el) => el.name == selectedcountry)[0].country_size;
  // console.log(filteredcountry);

  // console.log(outside.filter((el) => el.name == selectedcountry)[0].country_size);

  // blocksamount = outside[nbrmouse] / 100;

  // blocksamount = (outside.filter((el) => el.name == selectedcountry)[0].forest_area * 1) / 5000;
  // blocksamount = 5000;

  // moveSpeed = (outside.filter((el) => el.name == selectedcountry)[0].gain * 1)/10000;

  // console.log(outside.filter((el) => el.name == selectedcountry)[0]);

  // moveScale = (outside.filter((el) => el.name == selectedcountry)[0].forest_area * -1) / 5000;

  // var ellipseSize = (outside.filter((el) => el.name == selectedcountry)[0].country_size * 1)/10000;
  var currentforestsize = outside.filter((el) => el.name == selectedcountry)[0].forest_area * 1;
  // console.log(currentforestsize, maxforest.forest_area);
  // console.log(currentforestsize / maxforest.forest_area * 100);

  // ellipseSize = floor(map(currentforestsize, minforest.forest_area, maxforest, 100, 1));
  ellipseSize = 2;
  // console.log(ellipseSize);
  // blocksamount = 5000/ellipseSize;
  blocksamount = 5000;

  amount_boreal = outside.filter((el) => el.name == selectedcountry)[0].boreal * 1;
  amount_subtrop = outside.filter((el) => el.name == selectedcountry)[0].subtropics * 1;
  amount_temperal = outside.filter((el) => el.name == selectedcountry)[0].temperate * 1;
  amount_tropical = outside.filter((el) => el.name == selectedcountry)[0].tropics * 1;
  amount_growth = outside.filter((el) => el.name == selectedcountry)[0].gain * 1;
  var total_amount = amount_boreal + amount_subtrop + amount_temperal + amount_tropical;
  // console.log(amount_boreal, amount_subtrop, amount_temperal, amount_tropical, total_amount);

  var perc_boreal = floor(map(amount_boreal, 0, total_amount, 0, blocksamount));
  var perc_temperal = floor(map(amount_temperal, 0, total_amount, 0, blocksamount));
  var perc_tropical = floor(map(amount_tropical, 0, total_amount, 0, blocksamount));
  var perc_subtropical = floor(map(amount_subtrop, 0, total_amount, 0, blocksamount));
  var perc_growth = floor(map(amount_growth, 0, total_amount, 0, blocksamount));

  console.log(currentCountryObject.gain);
  console.log(perc_growth);

  // console.log(perc_boreal, perc_subtropical, perc_temperal, perc_tropical);

  // var movescaleSize = floor(map(currentforestsize, minforest.forest_area, maxforest, 2000, 50));

  // console.log(outside.filter((el) => el.name == selectedcountry)[0].forest_area, ellipseSize);
  push();
  scale(scaletest);
  if (scaletest > 6){
    translate(-(windowWidth/2),-(windowHeight/3*2));
  }
  for (ax = 0; ax <= pos.length - 1; ax++) {
    with (pos[ax]) {
      let angle = noise(x / movescaleSize, y / movescaleSize) * TWO_PI * movescaleSize;//
      x += cos(angle) * moveSpeed;
      y += sin(angle) * moveSpeed;
      fill(c);
      ellipse(x, y, ellipseSize);
      // if(x > width || x < 0 || y > height || y < 0 || random(1) < 0.008){
      // 	x = random(width);
      // 	y = random(height);
      // }
    }
    if (ax > blocksamount){
      with (pos[ax]) {
        let angle = noise(x / movescaleSize, y / movescaleSize) * TWO_PI * movescaleSize;//
        x += cos(angle) * moveSpeed*2;
        y += sin(angle) * moveSpeed*2;
        fill(c);
        ellipse(x, y, ellipseSize);
        // if(x > width || x < 0 || y > height || y < 0 || random(1) < 0.008){
        // 	x = random(width);
        // 	y = random(height);
        // }
      }
    }
  }
  pop();

  // console.log(outside.filter((el) => el.name == selectedcountry));

  // console.log(outside);

  if (nbrmouse != oldnumber) {
    makewhite = true;
    oldnumber = nbrmouse;
  }

  if (makewhite == true) {
    // console.log("true!");
    pos = [];
    drawlines = blocksamount;
    // scaletest = random(1,15);
    scaletest = floor(map(currentforestsize, 10000, maxforest, 8, 1));
    if (scaletest < 1){
      scaletest = 1;
    }
    if (scaletest > 8){
      scaletest = 8;
    }
    console.log(scaletest);
    movescaleSize = random(600, 900);
    // draw_boreal = amount_boreal/5000;
    // draw_subtrop = amount_subtrop/5000;
    // draw_temperal = amount_temperal/5000;
    // draw_tropical = amount_tropical/5000;

    drawlines = Math.floor(drawlines);
    if (drawlines < 1) {
      drawlines = 1;
    }
    // draw_boreal = Math.floor(draw_boreal);
    // if (draw_boreal < 1) {
    //   draw_boreal = 1;
    // }
    // draw_subtrop = Math.floor(draw_subtrop);
    // if (draw_subtrop < 1) {
    //   draw_subtrop = 1;
    // }
    // draw_temperal = Math.floor(draw_temperal);
    // if (draw_temperal < 1) {
    //   draw_temperal = 1;
    // }
    // pos_tropical = Math.floor(pos_tropical);
    // if (pos_tropical < 1) {
    //   pos_tropical = 1;
    // }

    // pos_boreal = [];
    // pos_subtrop = [];
    // pos_temperal = [];
    // pos_tropical = [];
    ax = 0;

    // for (let i = 1; i < 100000; i++) {
    //   pos.push({
    //     x: random(width),
    //     y: random(height),
    //     c: colors_tundra[floor(random(colors_tundra.length))]
    //   });
    // }
    // for (let i = 1; i < blocksamount; i++) {
    for (let x = 0; x < perc_boreal + 1; x++) {
      pos.push({
        x: random(width),
        y: random(height),
        c: colors_boreal[floor(random(colors_boreal.length))]
      });
    }
    for (let x = 0; x < perc_subtropical + 1; x++) {
      pos.push({
        x: random(width),
        y: random(height),
        c: colors_subtropical[floor(random(colors_subtropical.length))]
      });
    }
    for (let x = 0; x < perc_temperal + 1; x++) {
      pos.push({
        x: random(width),
        y: random(height),
        c: colors_temperal[floor(random(colors_temperal.length))]
      });
    }
    for (let x = 0; x < perc_tropical + 1; x++) {
      pos.push({
        x: random(width),
        y: random(height),
        c: colors_tropical[floor(random(colors_tropical.length))]
      });
    }
    for (let x = 0; x < perc_growth + 1; x++) {
      pos.push({
        x: random(width),
        y: random(height),
        c: 'blue'
      });
    }
    console.log(pos);
    // }
    // for (let i = 1; i < 10000; i++) {
    //   pos_boreal.push({
    //     x: random(width),
    //     y: random(height),
    //     c: colors_desert[floor(random(colors_desert.length))]
    //   });
    // }
    // for (let i = 1; i < 10000; i++) {
    //   pos_subtrop.push({
    //     x: random(width),
    //     y: random(height),
    //     c: colors_desert[floor(random(colors_desert.length))]
    //   });
    // }
    // for (let i = 1; i < 10000; i++) {
    //   pos_temperal.push({
    //     x: random(width),
    //     y: random(height),
    //     c: colors_desert[floor(random(colors_desert.length))]
    //   });
    // }
    // for (let i = 1; i < 10000; i++) {
    //   pos_tropical.push({
    //     x: random(width),
    //     y: random(height),
    //     c: colors_desert[floor(random(colors_desert.length))]
    //   });
    // }
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
    text(selectedcountry, 50, 180);
    makewhite = false;
  }

}


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

class testobj {
  constructor(dataArray) {
    this.iso = dataArray.arr[0];
    this.country_name = dataArray.arr[1];
    this.yr = dataArray.arr[2] * 1;
    this.tree_cover = dataArray.arr[3] * 1;
    this.country_area_ha = dataArray.arr[4] * 1;
    this.subtropical_ha = dataArray.arr[5] * 1;
    this.tropical_ha = dataArray.arr[6] * 1;
    this.temperate_ha = dataArray.arr[7] * 1;
    this.boreal_ha = dataArray.arr[8] * 1;
  }
}

function datacombiner() {

  // countryData.sort(function (a, b) {
  //   return a.country_area_ha - b.country_area_ha;
  // });

  testdata.forEach((el) => countrynames.push(el.country_name));

  // countryData.forEach((el) => countrynames.push(el.country_name));

  // console.log(countrynames);
}



