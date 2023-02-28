export const formInputTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
	<div class="form-floating my-2">
		<input
			type=""
			name=""
			id=""
			class="form-control"
			placeholder=""
		/>
		<label for="" class="form-label"></label>
	</div>
`,
    'text/html'
  );

  return el.querySelector('body > *');
};
