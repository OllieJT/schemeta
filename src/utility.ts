function to_attributes(attributes: Record<string, unknown>) {
	return Object.entries(attributes)
		.map(([key, value]) => {
			if (value instanceof URL) return `${key}="${value.href}"`;
			if (value instanceof Date) return `${key}="${value.toISOString()}"`;
			else return `${key}="${value}"`;
		})
		.join(" ");
}

export function create_tag(
	element: string,
	attributes: Record<string, unknown>,
	children?: object,
) {
	const attribs = to_attributes(attributes);

	if (children) {
		return `<${element} ${attribs}>${JSON.stringify(children)}</${element}>`;
	} else {
		return `<${element} ${attribs} />`;
	}
}
