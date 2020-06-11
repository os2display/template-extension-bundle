# Darkmode

## Usage

### .json file

Example configuration for slide .json file to enable the tool in the administration:
```
"tools": [
  {
    "name": "Darkmode",
    "id": "darkmode"
  }
]
```

Add the following to empty_options:
```
"darkmode": false,
"darkmode_from": 19,
"darkmode_to": 6
```

### Slide js

Add something like the following to the run function of the slide js to calculate if darkmode should be enabled.
```
// Darkmode.
if (slide.options.darkmode) {
slide.darkmodeEnabled = false;

var darkmodeFrom = slide.options.darkmode_from;
var darkmodeTo = slide.options.darkmode_to;

var hourNow = (new Date()).getHours();

// Darkmode starts one day and ends the next.
if (darkmodeFrom > darkmodeTo) {
  if (hourNow > darkmodeFrom) {
    slide.darkmodeEnabled = true;
  }
  else if (hourNow < darkmodeTo) {
    slide.darkmodeEnabled = true;
  }
}
else {
  if (hourNow >= darkmodeFrom && hourNow < darkmodeTo) {
    slide.darkmodeEnabled = true;
  }
}
}
```

### Slide template

And add a class to the top of the slide to style from.
```
data-ng-class="{'darkmode': ikSlide.darkmodeEnabled}"
```
