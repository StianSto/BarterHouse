export const modalAlertTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="modal fade" tabindex="-1">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title"></h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body fs-5">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		`,
    'text/html'
  );
  return el.querySelector('body > *');
};
