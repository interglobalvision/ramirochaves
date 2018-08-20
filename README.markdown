ramirochaves
---

## Tech

This works thanks to the great work of:

- https://webpack.js.org/
- https://getcomposer.org/
- https://github.com/WebDevStudios/CMB2
- https://github.com/fightbulc/moment.php
- https://github.com/aFarkas/lazysizes

---

## Setup

- `yarn`
- check composer.json if you want moment or other things
- `composer install`
- `webpack`

## Add new packages

To install new packages use [yarn](https://yarnpkg.com/en/)

E.g. **Slick Slider**

```
yarn add slick-carousel
```

Then import js files in `main.js`:

```
import 'slick-carousel';

```

And import css files in `site.styl`:

```
@import '~slick-carousel/slick/slick.css';
```

*`~` is used to ref `node_modules` inside stylus*

Each package is added differently depending on it's export and nature. Most modern packages are webpack friendly :)
