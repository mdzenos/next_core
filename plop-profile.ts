module.exports = function (plop: any) {
  plop.setGenerator('module', {
    description: 'Generate a new Next.js module folder with standard files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tên module mới là gì? (ví dụ: dashboard, auth/login,...)'
      }
    ],
    actions: (data: any) => {
      const folder = `src/app/${data.name}`;

      // Lấy tên cuối cùng sau dấu / (ví dụ auth/login => login)
      const lastPart = data.name.split('/').pop();

      // Convert theo properCase và camelCase của phần cuối
      const properCaseName = plop.getHelper('properCase')(lastPart);
      const camelCaseName = plop.getHelper('camelCase')(lastPart);

      return [
        // Core Next.js files
        {
          type: 'add',
          path: `${folder}/page.tsx`,
          templateFile: 'plop-templates/page.tsx.hbs'
        },
        {
          type: 'add',
          path: `${folder}/layout.tsx`,
          templateFile: 'plop-templates/layout.tsx.hbs'
        },
        {
          type: 'add',
          path: `${folder}/loading.tsx`,
          templateFile: 'plop-templates/loading.tsx.hbs'
        },
        {
          type: 'add',
          path: `${folder}/error.tsx`,
          templateFile: 'plop-templates/error.tsx.hbs'
        },

        // Components
        {
          type: 'add',
          path: `${folder}/components/${properCaseName}View.tsx`,
          templateFile: 'plop-templates/components/component.tsx.hbs'
        },

        // Hooks
        {
          type: 'add',
          path: `${folder}/hooks/use${properCaseName}.ts`,
          templateFile: 'plop-templates/hooks/hook.ts.hbs'
        },

        // Services
        {
          type: 'add',
          path: `${folder}/services/${properCaseName}Service.ts`,
          templateFile: 'plop-templates/services/service.ts.hbs'
        },

        // Slices
        {
          type: 'add',
          path: `${folder}/slices/${properCaseName}Slice.ts`,
          templateFile: 'plop-templates/slices/slice.ts.hbs'
        },

        // Types
        {
          type: 'add',
          path: `${folder}/types.ts`,
          templateFile: 'plop-templates/types.ts.hbs'
        },

        // Auto import slice vào rootReducer.ts
        {
          type: 'modify',
          path: 'src/store/rootReducer.ts',
          pattern: /(\/\/ -- IMPORT SLICES --)/,
          template: `import ${camelCaseName}Reducer from '@app/${data.name}/slices/${properCaseName}Slice';\n$1`,
        },
        {
          type: 'modify',
          path: 'src/store/rootReducer.ts',
          pattern: /(\/\/ -- ADD TO ROOT REDUCER --)/,
          template: `  ${camelCaseName}: ${camelCaseName}Reducer,\n$1`,
        },
      ];
    }
  });
};
