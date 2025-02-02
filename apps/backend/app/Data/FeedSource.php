<?php

namespace App\Data;

enum FeedSource: string
{
    case BOTTLE = 'BOTTLE';

    case LEFT_BREAST = 'LEFT_BREAST';

    case RIGHT_BREAST = 'RIGHT_BREAST';
}
