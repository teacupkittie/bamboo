export const get = async () => {
	const allFiles = import.meta.glob('$lib/data/*.md');
	const iterableFiles = Object.entries(allFiles);

	const allDescriptions = await Promise.all(
		iterableFiles.map(async ([path, resolver]) => {
			const resolvedDescription = await resolver();
			const { html } = resolvedDescription.default.render();
			const postPath = path.slice(2, -3);

			return {
				meta: resolvedDescription.metadata,
				path: postPath,
				html: html
			};
		})
	);

	return {
		body: allDescriptions
	};
};
