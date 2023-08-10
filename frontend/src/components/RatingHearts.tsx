import FavoriteIcon from '@mui/icons-material/Favorite';

type Props = {
    rating: number;
};

export default function RatingHearts({ rating }: Props) {

    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= filledStars) {
            stars.push(<FavoriteIcon key={i} />);
        } else if (hasHalfStar && i === filledStars + 1) {
            stars.push(
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <FavoriteIcon />
          <FavoriteIcon style={{ clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)` }} />
        </span>
            );
        } else {
            stars.push(<FavoriteIcon key={i} style={{ color: 'rgba(0, 0, 0, 0.38)' }} />);
        }
    }

    return <>{stars}</>;
}
