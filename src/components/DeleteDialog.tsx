export default function DeleteDialog({ entity, setShowDeleteConfirm, confirmDelete }: { entity: string; setShowDeleteConfirm: (show: boolean) => void; confirmDelete: () => void }) {
    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            className="w-full max-w-sm rounded-lg border border-border bg-bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg text-text-primary font-display">
              Delete this character?
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              This will permanently remove {entity} from your world.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-md border border-border px-3 py-1.5 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-md bg-red-900 px-3 py-1.5 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        </>
    )
}