export function format_primitive(data: URL | Date | string | number | boolean): string {
	if (data instanceof URL) return data.href;
	if (data instanceof Date) return data.toISOString();
	else if (typeof data === "boolean") return String(data);
	else if (typeof data === "string") return data;
	else if (typeof data === "number") return data.toString();
	else if (!data) return "";
	else return JSON.stringify(data);
}
