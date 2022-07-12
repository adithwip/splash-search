import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 10,

    padding: '16px',
    backgroundColor: theme.colors.gray[0]
  }

}))

export default useStyles