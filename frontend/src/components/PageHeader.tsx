import { Paper, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

interface Props {
  showHeader: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  title: string;
}

export const PageHeader = ({
  showHeader,
  headerTitle,
  headerSubtitle,
  title,
}: Props) => {
  return showHeader ? (
    <Paper
      elevation={3}
      sx={{ textAlign: 'left', margin: '30px', bgcolor: blueGrey[100] }}
    >
      <Typography sx={{ padding: '20px' }} variant="h4">
        {headerTitle}
      </Typography>
      <Typography sx={{ padding: '20px' }} variant="body1">
        {headerSubtitle}
      </Typography>
    </Paper>
  ) : (
    <Typography sx={{ padding: '20px' }} variant="h4">
      {title}
    </Typography>
  );
};
