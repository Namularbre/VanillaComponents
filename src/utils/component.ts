/**
 * The component class extents HTMLElement, you just have to give a html template and a cssStyleSheet and the class will do the rest.
 * If you want to do something more complex, simply extend the class.
 */
export class Component extends HTMLElement {

    constructor(protected template: string, protected cssStyleSheet?: string) {
        super();
    }

    /**
     * callback from HTMLElement class, that is called when the component is connected to dom
     */
    connectedCallback(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.render();
        });
    }

    /**
     * Render the template
     */
    protected render(): void {
        this.innerHTML = this.template;
    }
}

/**
 * Object component have dynamic templates. You can put {{PROP_NAME}} (/!\ no spaces between names and brackets!) in the template and the component will populate itself with the object you gave to him 
 */
export class ObjectComponent extends Component {
    constructor(protected template: string, private object: Record<string, any>, protected cssStyleSheet?: string) {
        super(template, cssStyleSheet);
    }

    /**
     * Render the template and populates it with the object data
     */
    protected render(): void {
        Object.keys(this.object).forEach((key: string) => {
            const val: any = this.object[key];

            this.template = this.template.replace(`{{${key.toUpperCase()}}}`, `${val}`);
        });

        super.render();
    }
}

/**
 * use fetch to get content from a distant html file
 * @param url {string|URL}
 * @returns {Promise<string>}
 */
export async function fetchTemplate(url: string|URL): Promise<string> {
    const response = await fetch(url);
    return response.text();
}

/**
 * define a custom element from your component
 * @param component {typeof Component}
 * @param divName {string}
 */
export function persist(component: typeof Component, divName: string): void {
    customElements.define(divName, component);
}
