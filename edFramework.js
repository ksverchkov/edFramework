const edFramework = {
  routes: {},
  templates: {},
  addons: [],
  handlers: {},
  components: {},
  state: {},
  
  useState(initialValue) {
    const key = Object.keys(this.state).length;
    if (!this.state[key]) {
      this.state[key] = initialValue;
    }

    const setState = (newValue) => {
      this.state[key] = newValue;
      this.render();
    };

    return [this.state[key], setState];
  },

  addRoute(path, templateName, handler) {
    this.routes[path] = {
      template: templateName,
      handler: handler,
    };
  },

  addTemplate(templateName, templateContent) {
    this.templates[templateName] = templateContent;
  },

  addAddon(addon) {
    this.addons.push(addon);
  },

  addHandler(eventName, handler) {
    this.handlers[eventName] = handler;
  },

  addComponent(componentName, componentContent) {
    this.components[componentName] = componentContent;
  },

  init() {
    this.addons.forEach((addon) => {
      addon.init();
    });

    this.handleRoute();

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });
  },

  handleRoute() {
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

  renderVariables(template) {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = template.match(regex);

    if (matches) {
      matches.forEach((match) => {
        const variable = match.slice(2, -2).trim();

        if (this.components[variable]) {
          const componentTemplate = this.components[variable];
          template = template.replace(match, componentTemplate);
        } else if (variable.startsWith('state[')) {
          const stateKey = variable.slice(6, -1); // Extract state key
          const stateValue = this.state[stateKey];
          template = template.replace(match, stateValue);
        } else {
          const value = eval(variable);
          template = template.replace(match, value);
        }
      });
    }

    return template;
  },

  compileForEach(template) {
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

  compileLoop(variable, content) {
    const loopData = eval(variable);
    let compiledLoop = '';

    if (Array.isArray(loopData)) {
      loopData.forEach((item) => {
        if (this.components[item]) {
          const componentTemplate = this.components[item];
          compiledLoop += componentTemplate;
        } else {
          const regex = /\{\{(.*?)\}\}/g;
          let compiledContent = content;

          const matches = content.match(regex);
          if (matches) {
            matches.forEach((match) => {
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

  render() {
    this.handleRoute(); // Re-render the current route
  },
};