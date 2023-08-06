import StarIcon from '@mui/icons-material/Star';

type Props = {
    rating: number;
};

export default function RatingStars({ rating }: Props) {

    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= filledStars) {
            stars.push(<StarIcon key={i} />);
        } else if (hasHalfStar && i === filledStars + 1) {
            stars.push(
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <StarIcon />
          <StarIcon style={{ clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)` }} />
        </span>
            );
        } else {
            stars.push(<StarIcon key={i} style={{ color: 'rgba(0, 0, 0, 0.38)' }} />);
        }
    }

    return <>{stars}</>;
}