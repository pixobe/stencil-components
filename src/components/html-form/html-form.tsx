import { Component, Host, h, Method, Element } from '@stencil/core';

@Component({
  tag: 'html-form',
  styleUrl: 'html-form.scss',
  shadow: true
})
export class HtmlForm {

  ref: HTMLFormElement;

  @Method()
  async formData() {
    const jsonObject: any = {};
    const groupedFields: Record<string, Record<string, string[]>> = {};
    const slot = this.ref.querySelector("slot");
    const assignedElements = slot?.assignedElements({ flatten: true }) as Array<HTMLInputElement> || [];

    const formElements: HTMLInputElement[] = assignedElements
      .flatMap(el => {
        if ((el as HTMLInputElement).name) return [el as HTMLInputElement];
        return Array.from(el.querySelectorAll<HTMLInputElement>('input, select, textarea, [name]'));
      })
      .filter(el => !!el.name && el.dataset.ignore === undefined)


    for (const el of formElements) {

      const key = el.name;
      let rawValue: any = el.value;

      if (el.type === 'checkbox') {
        rawValue = (el as HTMLInputElement).checked;
      }

      // Parse booleans from string
      let parsedValue: any = rawValue;
      if (parsedValue === 'true') parsedValue = true;
      else if (parsedValue === 'false') parsedValue = false;

      // Handle grouped fields like fieldNameSuffix[]
      const match = key.match(/^(\w+)\[\]\.(\w+)$/);
      if (match) {
        const base = match[1];    // e.g., 'font'
        const suffix = match[2];  // e.g., 'name'

        groupedFields[base] ??= {};
        groupedFields[base][suffix] ??= [];
        groupedFields[base][suffix].push(parsedValue);
        continue;
      }

      const keys = key.split('.');
      let current = jsonObject;
      for (let i = 0; i < keys.length; i++) {
        const part = keys[i];
        const isLast = i === keys.length - 1;
        if (isLast) {
          if (current.hasOwnProperty(part)) {
            if (Array.isArray(current[part])) {
              current[part].push(parsedValue);
            } else {
              current[part] = [current[part], parsedValue];
            }
          } else {
            current[part] = parsedValue;
          }
        } else {
          current[part] ??= {};
          current = current[part];
        }
      }
    }
    // Convert groupedFields into array of objects
    for (const base in groupedFields) {
      const group = groupedFields[base];
      const maxLen = Math.max(...Object.values(group).map(arr => arr.length));
      jsonObject[base] = [];
      for (let i = 0; i < maxLen; i++) {
        const entry: any = {};
        for (const field in group) {
          entry[field] = group[field][i] ?? '';
        }
        jsonObject[base].push(entry);
      }
    }
    return jsonObject;
  }



  render() {
    return (
      <Host>
        <form ref={(el) => this.ref = el as HTMLFormElement}>
          <slot></slot>
        </form>
      </Host>
    );
  }
}
