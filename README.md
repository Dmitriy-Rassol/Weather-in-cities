# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

![screencapture-localhost-5173-2024-03-14-03_48_21](https://github.com/Dmitriy-Rassol/Weather-in-cities/assets/52157280/8ae27294-111c-4dd5-ba7a-4486608323cd)

![screencapture-localhost-5173-weather-Cherepovets-2024-03-14-03_48_35](https://github.com/Dmitriy-Rassol/Weather-in-cities/assets/52157280/d650e539-eef9-4c9d-9f02-9219aea961a5)

![screencapture-localhost-5173-2024-03-14-03_47_32](https://github.com/Dmitriy-Rassol/Weather-in-cities/assets/52157280/6459f376-3626-49e1-904a-4bda42da9763)

![screencapture-localhost-5173-weather-Moscow-2024-03-14-03_45_58](https://github.com/Dmitriy-Rassol/Weather-in-cities/assets/52157280/ab7b87d7-c77e-4640-9973-9509dd4accc9)



