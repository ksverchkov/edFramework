const edFramework = {
  routes: {},
  templates: {},
  addons: [],
  handlers: {},
  components: {},

  addRoute: function(path, templateName, handler) {
    this.routes[path] = {
      template: templateName,
      handler: handler,
    };
  },

  addTemplate: function(templateName, templateContent) {
    this.templates[templateName] = templateContent;
  },

  addAddon: function(addon) {
    this.addons.push(addon);
  },

  addHandler: function(eventName, handler) {
    this.handlers[eventName] = handler;
  },

  addComponent: function(componentName, componentContent) {
    this.components[componentName] = componentContent;
  },

  init: function() {
    this.addons.forEach(function(addon) {
      addon.init();
    });

    this.handleRoute();

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  },

  handleRoute: function() {
    const path = window.location.hash.substring(1);
    const route = this.routes[path];

    if (route) {
      const template = this.templates[route.template];
      const renderedTemplate = this.renderVariables(template);
      const compiledTemplate = this.compileForEach(renderedTemplate);

      document.getElementById('app').innerHTML = compiledTemplate;

      const handler = this.handlers[route.handler];
      if (handler) {
        handler();
      }
    } else {
      document.getElementById('app').innerHTML = 'Route not found';
      console.log('Current route: ' + route + '; Path: ' + path);
    }
  },

  renderVariables: function(template) {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = template.match(regex);

    if (matches) {
      matches.forEach((match) => {
        const variable = match.slice(2, -2).trim();

        if (edFramework.components[variable]) {
          const componentTemplate = edFramework.components[variable];
          template = template.replace(match, componentTemplate);
        } else {
          const value = eval(variable);
          template = template.replace(match, value);
        }
      });
    }

    return template;
  },

  compileForEach: function(template) {
    const regex = /\{\{#foreach (.*?)\}\}(.*?)\{\{\/foreach\}\}/gs;
    const matches = template.matchAll(regex);

    for (const match of matches) {
      const loopVariable = match[1].trim();
      const loopContent = match[2].trim();

      const compiledLoop = this.compileLoop(loopVariable, loopContent);
      template = template.replace(match[0], compiledLoop);
    }

    return template;
  },

  compileLoop: function(variable, content) {
    const loopData = eval(variable);
    let compiledLoop = '';

    if (Array.isArray(loopData)) {
      loopData.forEach(function(item) {
        if (Framework.components[item]) {
          const componentTemplate = edFramework.components[item];
          compiledLoop += componentTemplate;
        } else {
          const regex = /\{\{(.*?)\}\}/g;
          let compiledContent = content;

          const matches = content.match(regex);
          if (matches) {
            matches.forEach(function(match) {
              const loopVariable = match.slice(2, -2).trim();
              const loopValue = item[loopVariable];

              compiledContent = compiledContent.replace(match, loopValue);
            });
          }

          compiledLoop += compiledContent;
        }
      });
    }

    return compiledLoop;
  },
};
