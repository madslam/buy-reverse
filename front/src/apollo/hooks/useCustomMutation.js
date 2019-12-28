import {useMutation} from 'react-apollo';
import {useSnackbar} from 'notistack';

export default (
  graphqlRequest,
  variables,
  refetchQueries,
  successMessage,
  errorMessage
) => {
  const {enqueueSnackbar} = useSnackbar ();

  const [mutation, {loading}] = useMutation (graphqlRequest, {
    variables,
    refetchQueries,
    onCompleted: data => {
      enqueueSnackbar (successMessage, {
        variant: 'success',
      });
    },
    onError: error =>
      enqueueSnackbar (` ${errorMessage} : ${error}`, {
        variant: 'error',
      }),
  });

  return {
    mutate: mutation,
    loading,
  };
};
