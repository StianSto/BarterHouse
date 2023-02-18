export const formInputTemplate = new DOMParser().parseFromString(
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
