import { useEffect, useState } from "react";

/** @see https://github.com/Thinkmill/keystatic/blob/main/packages/keystatic/src/form/fields/image/ui.tsx#L48-L63 */
export function useObjectUrl(data: Uint8Array | null, contentType: string | undefined) {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		const url =
			data == null
				? null
				: URL.createObjectURL(new Blob([new Uint8Array(data)], { type: contentType }));
		// oxlint-disable-next-line react/set-state-in-effect -- Publish the object URL created by this effect.
		setUrl(url);

		if (url == null) return undefined;
		return () => {
			URL.revokeObjectURL(url);
		};
	}, [contentType, data]);

	return url;
}
