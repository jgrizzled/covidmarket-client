/*
  Fetcher for React Suspense
  Wrap component in Suspense:  <Suspense fallback={fallbackComponent}><Component /></Suspense>
  Usage:
  const myData = createResource(fetchMyData()).read()
*/
export default function createResource(promise) {
  let status = 'loading';
  let result;
  let suspender = promise.then(
    data => {
      status = 'success';
      result = data;
    },
    error => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      if (status === 'loading') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}
