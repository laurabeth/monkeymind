import { renderHook } from "@testing-library/react-hooks";
import { AsyncResult, useAsync } from "./useAsync";

it("works as expected", async () => {
	const expectedError = new Error();

	const { result, rerender, waitForNextUpdate } = renderHook(
		({ counter }) =>
			useAsync(() => {
				return counter % 2 === 0
					? Promise.resolve(counter)
					: Promise.reject(expectedError);
			}, [counter]),
		{
			initialProps: { counter: 0 },
		},
	);

	// Initial status is loading
	expect(result.current).toEqual<AsyncResult<number>>({
		data: null,
		error: null,
		isLoading: true,
		status: "loading",
	});

	// Initial load complete (success)
	await waitForNextUpdate();
	expect(result.current).toEqual<AsyncResult<number>>({
		data: 0,
		error: null,
		isLoading: false,
		status: "complete",
	});

	// Update counter, status returns to loading
	rerender({ counter: 1 });
	expect(result.current).toEqual<AsyncResult<number>>({
		data: null,
		error: null,
		isLoading: true,
		status: "loading",
	});

	// New load complete, odd number should error
	await waitForNextUpdate();
	expect(result.current).toEqual<AsyncResult<number>>({
		data: null,
		error: expectedError,
		isLoading: false,
		status: "error",
	});

	// Update counter again, status returns to loading
	rerender({ counter: 2 });
	expect(result.current).toEqual<AsyncResult<number>>({
		data: null,
		error: null,
		isLoading: true,
		status: "loading",
	});

	// New load complete, even number should be successful
	await waitForNextUpdate();
	expect(result.current).toEqual<AsyncResult<number>>({
		data: 2,
		error: null,
		isLoading: false,
		status: "complete",
	});
});

it("aborts on unmount", () => {
	let signal = new AbortController().signal;

	const { unmount } = renderHook(() =>
		useAsync((s) => {
			signal = s;
			return Promise.resolve(0);
		}, []),
	);
	unmount();

	expect(signal.aborted).toBe(true);
});

it("aborts on dep change", () => {
	let signal = new AbortController().signal;

	const { rerender } = renderHook(
		({ counter }) =>
			useAsync(
				(s) => {
					signal = s;
					return Promise.resolve(0);
				},
				[counter],
			),
		{
			initialProps: { counter: 0 },
		},
	);

	const prevSignal = signal;
	rerender({ counter: 1 });
	expect(prevSignal.aborted).toBe(true);
});
