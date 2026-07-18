import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  FadeInUp,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../../components/AnimatedBackground';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab =
  | 'FANZONE'
  | 'PREDICT'
  | 'REWARDS'
  | 'LEADERS'
  | 'PROFILE'
  | 'SELFIE'
  | 'POLLS'
  | 'CHAT'
  | 'STORE'
  | 'BADGES'
  | 'AI';

interface ChatMsg {
  id: string;
  user: string;
  avatar: string;
  text: string;
  emoji?: string;
  pinned?: boolean;
  time: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'FANZONE', label: 'Fan Zone', icon: 'soccer' },
  { key: 'PREDICT', label: 'Predict', icon: 'crystal-ball' },
  { key: 'REWARDS', label: 'Rewards', icon: 'star-circle' },
  { key: 'LEADERS', label: 'Leaders', icon: 'trophy' },
  { key: 'PROFILE', label: 'Profile', icon: 'account-circle' },
  { key: 'SELFIE', label: 'Selfie', icon: 'camera' },
  { key: 'POLLS', label: 'Polls', icon: 'poll' },
  { key: 'CHAT', label: 'Chat', icon: 'chat' },
  { key: 'STORE', label: 'Store', icon: 'shopping' },
  { key: 'BADGES', label: 'Badges', icon: 'medal' },
  { key: 'AI', label: 'AI', icon: 'robot' },
];

const QUIZ_QUESTIONS = [
  {
    q: 'Which country won the FIFA World Cup 2022?',
    options: ['France', 'Brazil', 'Argentina', 'Germany'],
    answer: 2,
  },
  {
    q: 'Who holds the record for most World Cup goals?',
    options: ['Ronaldo', 'Messi', 'Klose', 'Pele'],
    answer: 2,
  },
  {
    q: 'How many teams qualify for the 2026 World Cup?',
    options: ['32', '48', '40', '36'],
    answer: 1,
  },
  {
    q: 'Which city hosts the 2026 World Cup Final?',
    options: ['New York', 'Los Angeles', 'Dallas', 'Miami'],
    answer: 1,
  },
  {
    q: 'Who won the Golden Boot at World Cup 2018?',
    options: ['Messi', 'Ronaldo', 'Kane', 'Lukaku'],
    answer: 2,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Carlos M.', country: '🇧🇷', points: 18450, level: 42, badge: '🏆' },
  { rank: 2, name: 'Sofia K.', country: '🇩🇪', points: 16820, level: 39, badge: '🥇' },
  { rank: 3, name: 'Yuki T.', country: '🇯🇵', points: 15300, level: 37, badge: '🥈' },
  { rank: 4, name: 'Alex J.', country: '🇺🇸', points: 14750, level: 35, badge: '⭐' },
  { rank: 5, name: 'Priya S.', country: '🇮🇳', points: 13200, level: 33, badge: '🔥' },
  { rank: 6, name: 'Marco R.', country: '🇮🇹', points: 12800, level: 31, badge: '💎' },
  { rank: 7, name: 'Aisha B.', country: '🇿🇦', points: 11450, level: 29, badge: '🌟' },
  { rank: 8, name: 'Lucas P.', country: '🇦🇷', points: 10900, level: 28, badge: '⚡' },
];

const TEAM_FRAMES = [
  { id: 'bra', label: '🇧🇷 Brazil', color: '#009C3B' },
  { id: 'arg', label: '🇦🇷 Argentina', color: '#74ACDF' },
  { id: 'fra', label: '🇫🇷 France', color: '#002395' },
  { id: 'esp', label: '🇪🇸 Spain', color: '#C60B1E' },
  { id: 'eng', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', color: '#FFFFFF' },
  { id: 'ger', label: '🇩🇪 Germany', color: '#000000' },
];

const STORE_ITEMS = [
  { id: 's1', title: 'Free Burger', icon: 'hamburger', cost: 500, category: 'Food' },
  { id: 's2', title: 'Popcorn Combo', icon: 'food-variant', cost: 300, category: 'Food' },
  { id: 's3', title: 'FIFA Jersey', icon: 'tshirt-crew', cost: 2000, category: 'Merch' },
  { id: 's4', title: 'Scarf Collectible', icon: 'shopping', cost: 800, category: 'Merch' },
  { id: 's5', title: 'VIP Lounge Pass', icon: 'crown', cost: 5000, category: 'VIP' },
  { id: 's6', title: 'Player Card NFT', icon: 'cards', cost: 1500, category: 'Digital' },
];

const ACHIEVEMENTS = [
  {
    id: 'a1',
    title: 'First Prediction',
    icon: 'crystal-ball',
    desc: 'Made your first prediction',
    unlocked: true,
    xp: 50,
  },
  {
    id: 'a2',
    title: 'Quiz Master',
    icon: 'brain',
    desc: 'Answered 10 quiz questions correctly',
    unlocked: true,
    xp: 150,
  },
  {
    id: 'a3',
    title: 'Lucky Spinner',
    icon: 'rotate-3d-variant',
    desc: 'Won the Lucky Spin 3 times',
    unlocked: true,
    xp: 200,
  },
  {
    id: 'a4',
    title: 'Fan Chat King',
    icon: 'chat',
    desc: 'Sent 50 messages in fan chat',
    unlocked: false,
    xp: 300,
    progress: 32,
    total: 50,
  },
  {
    id: 'a5',
    title: 'Perfect Predictor',
    icon: 'check-decagram',
    desc: 'Predicted 5 match results correctly',
    unlocked: false,
    xp: 500,
    progress: 2,
    total: 5,
  },
  {
    id: 'a6',
    title: 'Top 10 Fan',
    icon: 'trophy',
    desc: 'Reached global top 10',
    unlocked: false,
    xp: 1000,
    progress: 4,
    total: 1,
  },
];

const POLLS = [
  {
    id: 'p1',
    question: 'Who wins today?',
    options: [
      { label: '🇧🇷 Brazil', votes: 4823 },
      { label: '🇦🇷 Argentina', votes: 3971 },
    ],
  },
  {
    id: 'p2',
    question: 'Next goal scorer?',
    options: [
      { label: 'Vinicius Jr', votes: 2910 },
      { label: 'Messi', votes: 4100 },
      { label: 'Other', votes: 1200 },
    ],
  },
  {
    id: 'p3',
    question: 'Best player on the pitch?',
    options: [
      { label: 'Rodri', votes: 1540 },
      { label: 'Bellingham', votes: 2800 },
      { label: 'Mbappe', votes: 3200 },
    ],
  },
];

const INIT_CHAT: ChatMsg[] = [
  {
    id: '1',
    user: 'ModBot',
    avatar: '🤖',
    text: '📌 Welcome to the official FIFA Fan Chat! Keep it respectful.',
    pinned: true,
    time: '18:00',
  },
  {
    id: '2',
    user: 'Carlos_BR',
    avatar: '🇧🇷',
    text: 'GOOOAL! Vini Jr is unbelievable tonight! 🔥',
    time: '18:32',
  },
  {
    id: '3',
    user: 'SofiaK',
    avatar: '🇩🇪',
    text: 'Argentina playing great defense though 💪',
    time: '18:34',
  },
  {
    id: '4',
    user: 'Yuki_T',
    avatar: '🇯🇵',
    text: 'This match is ELECTRIC ⚡ Best game of the tournament',
    time: '18:37',
  },
  {
    id: '5',
    user: 'PriyaS',
    avatar: '🇮🇳',
    text: "I predicted Brazil 2-1 in the PREDICT tab. Let's go! 🏆",
    time: '18:40',
  },
];

const AI_FAQ = [
  {
    q: '🎮 How do I earn XP?',
    a: 'Earn XP by completing daily challenges, quiz questions, Lucky Spin, and correct predictions. Each action grants different XP amounts.',
  },
  {
    q: '🏆 How does the leaderboard work?',
    a: 'The global leaderboard ranks fans by total reward points. Points are earned from all gamification activities. Top 3 get exclusive badges!',
  },
  {
    q: '🎰 How do I spin the Lucky Spin?',
    a: 'Go to Fan Zone → Lucky Spin. You get 1 free spin per day. Extra spins cost 100 coins each. Prizes include XP, coins, and badges.',
  },
  {
    q: '🔮 How accurate are my predictions?',
    a: 'Your prediction accuracy is shown in the Fan Profile tab. Correct predictions on winner, score, and scorer each award different point values.',
  },
  {
    q: '🛍 How do I redeem rewards?',
    a: 'Visit the Rewards Store tab. Browse items and tap Redeem. Coins are deducted from your balance. Food coupons are delivered to your seat!',
  },
];

// ─── Animated Badge Component ─────────────────────────────────────────────────

function AnimatedBadge({
  unlocked,
  icon,
  title,
  xp,
  progress,
  total,
  desc,
}: {
  unlocked: boolean;
  icon: string;
  title: string;
  xp: number;
  progress?: number;
  total?: number;
  desc: string;
}) {
  const [justUnlocked, setJustUnlocked] = useState(false);
  const scale = useSharedValue(1);
  const glow = useSharedValue(unlocked ? 1 : 0.3);
  const { theme, themeColors } = useGlobalContext();

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: glow.value,
  }));

  const handleUnlock = () => {
    if (!unlocked) {
      scale.value = withSequence(withSpring(1.3), withSpring(1));
      glow.value = withTiming(1, { duration: 400 });
      setJustUnlocked(true);
    }
  };

  return (
    <TouchableOpacity onPress={handleUnlock} activeOpacity={0.85}>
      <Animated.View style={animStyle}>
        <GlassCard
          style={[
            styles.badgeCard,
            unlocked || justUnlocked
              ? { borderColor: '#7C4DFF', borderWidth: 1.5 }
              : { borderColor: themeColors.border },
          ]}>
          <LinearGradient
            colors={
              unlocked || justUnlocked
                ? ['rgba(124,77,255,0.25)', 'rgba(0,200,255,0.1)']
                : ['transparent', 'transparent']
            }
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.badgeIcon}>{unlocked || justUnlocked ? '🏅' : '🔒'}</Text>
          <MaterialCommunityIcons
            name={icon as any}
            size={28}
            color={unlocked || justUnlocked ? '#FFD700' : themeColors.icon}
          />
          <Text style={[styles.badgeTitle, { color: themeColors.text }]}>{title}</Text>
          <Text style={[styles.badgeDesc, { color: themeColors.icon }]}>{desc}</Text>
          <Text style={[styles.badgeXP, { color: '#00E676' }]}>+{xp} XP</Text>
          {!unlocked && !justUnlocked && progress !== undefined && total !== undefined && (
            <View style={styles.badgeProgress}>
              <View style={[styles.badgeProgressBg, { backgroundColor: themeColors.border }]}>
                <View
                  style={[
                    styles.badgeProgressFill,
                    { width: `${(progress / total) * 100}%`, backgroundColor: '#7C4DFF' },
                  ]}
                />
              </View>
              <Text style={[styles.badgeProgressText, { color: themeColors.icon }]}>
                {progress}/{total}
              </Text>
            </View>
          )}
        </GlassCard>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Poll Bar Component ───────────────────────────────────────────────────────

function PollBar({
  label,
  votes,
  totalVotes,
  voted,
}: {
  label: string;
  votes: number;
  totalVotes: number;
  voted: boolean;
}) {
  const pct = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  const width = useSharedValue(0);
  const { theme, themeColors } = useGlobalContext();

  useEffect(() => {
    if (voted) {
      width.value = withTiming(pct, { duration: 700 });
    }
  }, [voted, pct, width]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value}%` as any,
  }));

  return (
    <View style={styles.pollOption}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={[styles.pollLabel, { color: themeColors.text }]}>{label}</Text>
        {voted && (
          <Text style={[styles.pollPct, { color: themeColors.tint }]}>{pct.toFixed(1)}%</Text>
        )}
      </View>
      <View style={[styles.pollBarBg, { backgroundColor: themeColors.border }]}>
        <Animated.View
          style={[styles.pollBarFill, { backgroundColor: themeColors.tint }, barStyle]}
        />
      </View>
      {voted && (
        <Text style={[styles.pollVotes, { color: themeColors.icon }]}>
          {votes.toLocaleString()} votes
        </Text>
      )}
    </View>
  );
}

// ─── Spin Wheel Component ─────────────────────────────────────────────────────

const WHEEL_SEGMENTS = [
  { label: '50 XP', color: '#7C4DFF' },
  { label: '100 Coins', color: '#00C8FF' },
  { label: '200 XP', color: '#FF5252' },
  { label: 'Badge!', color: '#FFD700' },
  { label: '500 XP', color: '#00E676' },
  { label: '50 Coins', color: '#FF9800' },
  { label: 'Try Again', color: '#546E7A' },
  { label: '1000 Coins', color: '#E91E63' },
];

function SpinWheel({ onResult }: { onResult: (prize: string) => void }) {
  const rotation = useSharedValue(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { theme, themeColors } = useGlobalContext();

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const spinCount = 5 + Math.random() * 5;
    const extraDeg = Math.random() * 360;
    const totalDeg = spinCount * 360 + extraDeg;
    rotation.value = withTiming(rotation.value + totalDeg, { duration: 3500 }, (finished) => {
      if (finished) {
        const segDeg = 360 / WHEEL_SEGMENTS.length;
        const finalAngle = totalDeg % 360;
        const segIdx = Math.floor((360 - finalAngle) / segDeg) % WHEEL_SEGMENTS.length;
        const prize = WHEEL_SEGMENTS[segIdx].label;
        setResult(prize);
        setSpinning(false);
        onResult(prize);
      }
    });
  };

  const wheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const SIZE = 260;
  const RADIUS = SIZE / 2;
  const segAngle = 360 / WHEEL_SEGMENTS.length;

  return (
    <View style={styles.spinContainer}>
      {/* Drawn wheel using border-radius wedge trick */}
      <View style={{ width: SIZE, height: SIZE, position: 'relative', alignSelf: 'center' }}>
        <Animated.View
          style={[
            { width: SIZE, height: SIZE, borderRadius: RADIUS, overflow: 'hidden' },
            wheelStyle,
          ]}>
          {WHEEL_SEGMENTS.map((seg, i) => {
            const startDeg = i * segAngle;
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: RADIUS,
                  height: RADIUS,
                  left: RADIUS,
                  top: RADIUS,
                  transformOrigin: '0 0',
                  backgroundColor: seg.color,
                  transform: [{ rotate: `${startDeg}deg` }, { skewY: `${90 - segAngle}deg` }],
                  opacity: 0.9,
                }}
              />
            );
          })}
          {/* Segment labels */}
          {WHEEL_SEGMENTS.map((seg, i) => {
            const midAngle = (i * segAngle + segAngle / 2 - 90) * (Math.PI / 180);
            const labelR = RADIUS * 0.62;
            const lx = RADIUS + Math.cos(midAngle) * labelR - 30;
            const ly = RADIUS + Math.sin(midAngle) * labelR - 8;
            return (
              <Text
                key={i}
                style={{
                  position: 'absolute',
                  left: lx,
                  top: ly,
                  width: 60,
                  fontSize: 9,
                  fontWeight: '700',
                  color: '#FFF',
                  textAlign: 'center',
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowRadius: 4,
                  textShadowOffset: { width: 1, height: 1 },
                }}>
                {seg.label}
              </Text>
            );
          })}
          {/* Center circle */}
          <View
            style={{
              position: 'absolute',
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: '#081223',
              left: RADIUS - 26,
              top: RADIUS - 26,
              borderWidth: 3,
              borderColor: '#FFD700',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 22 }}>⚽</Text>
          </View>
        </Animated.View>
        {/* Pointer */}
        <View
          style={{
            position: 'absolute',
            top: -16,
            left: RADIUS - 10,
            width: 20,
            height: 24,
            backgroundColor: '#FFD700',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 10,
          }}>
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderTopWidth: 14,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: '#FFD700',
              marginBottom: -14,
            }}
          />
        </View>
      </View>

      {result && (
        <Animated.View entering={FadeInUp.duration(400)} style={styles.spinResult}>
          <Text style={styles.spinResultEmoji}>🎉</Text>
          <Text style={styles.spinResultText}>You won: {result}!</Text>
        </Animated.View>
      )}

      <TouchableOpacity
        onPress={spin}
        disabled={spinning}
        style={[styles.spinBtn, { backgroundColor: spinning ? '#546E7A' : '#7C4DFF' }]}>
        <MaterialCommunityIcons name="rotate-3d-variant" size={22} color="#FFF" />
        <Text style={styles.spinBtnText}>{spinning ? 'Spinning…' : 'SPIN NOW'}</Text>
      </TouchableOpacity>

      <Text style={[styles.spinHint, { color: themeColors.icon }]}>
        1 Free Spin per day · Extra spins: 100 coins
      </Text>
    </View>
  );
}

// ─── Scratch Card Component ───────────────────────────────────────────────────

function ScratchCard() {
  const [scratched, setScratched] = useState(false);
  const opacity = useSharedValue(1);
  const prizes = ['🏆 500 XP', '💰 200 Coins', '🎫 VIP Pass', '🥇 Gold Badge', '⚽ 100 XP'];
  const [prize] = useState(prizes[Math.floor(Math.random() * prizes.length)]);

  const scratchStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleScratch = () => {
    if (scratched) return;
    opacity.value = withTiming(0, { duration: 600 });
    setScratched(true);
  };

  return (
    <GlassCard style={styles.scratchContainer}>
      <Text style={styles.scratchTitle}>🎰 Today's Scratch Card</Text>
      <TouchableOpacity onPress={handleScratch} activeOpacity={0.8} style={styles.scratchCard}>
        {/* Prize layer */}
        <LinearGradient colors={['#1a0535', '#0d1b30']} style={StyleSheet.absoluteFill} />
        <Text style={styles.scratchPrize}>{prize}</Text>
        {/* Cover layer */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.scratchCover, scratchStyle]}>
          <LinearGradient colors={['#7C4DFF', '#5A6BFF']} style={StyleSheet.absoluteFill} />
          <MaterialCommunityIcons name="gesture-swipe" size={40} color="rgba(255,255,255,0.6)" />
          <Text style={styles.scratchHint}>Tap to Scratch!</Text>
        </Animated.View>
      </TouchableOpacity>
      {scratched && (
        <Animated.Text entering={FadeInUp} style={styles.scratchCongrats}>
          🎊 Congratulations! {prize} added to your wallet!
        </Animated.Text>
      )}
    </GlassCard>
  );
}

// ─── Penalty Shootout Mini-Game ───────────────────────────────────────────────

const GOAL_CELLS = [
  { id: 0, label: 'Top Left' },
  { id: 1, label: 'Top Centre' },
  { id: 2, label: 'Top Right' },
  { id: 3, label: 'Bottom Left' },
  { id: 4, label: 'Bottom Centre' },
  { id: 5, label: 'Bottom Right' },
];

function PenaltyShootout() {
  const { theme, themeColors } = useGlobalContext();
  const [score, setScore] = useState({ you: 0, keeper: 0 });
  const [round, setRound] = useState(0);
  const [history, setHistory] = useState<{ cell: number; saved: boolean }[]>([]);
  const [shooting, setShooting] = useState(false);

  const shoot = (cellId: number) => {
    if (shooting || round >= 5) return;
    setShooting(true);
    const saved = Math.random() < 0.35;
    setTimeout(() => {
      setHistory((h) => [...h, { cell: cellId, saved }]);
      setScore((s) => ({ you: s.you + (saved ? 0 : 1), keeper: s.keeper + (saved ? 1 : 0) }));
      setRound((r) => r + 1);
      setShooting(false);
    }, 600);
  };

  const reset = () => {
    setScore({ you: 0, keeper: 0 });
    setRound(0);
    setHistory([]);
    setShooting(false);
  };

  const done = round >= 5;

  return (
    <GlassCard style={styles.penaltyContainer}>
      <Text style={styles.penaltyTitle}>⚽ Penalty Shootout</Text>
      {/* Score board */}
      <View style={styles.penaltyScore}>
        <View style={styles.penaltyScoreItem}>
          <Text style={styles.penaltyScoreLabel}>YOU</Text>
          <Text style={[styles.penaltyScoreNum, { color: '#00E676' }]}>{score.you}</Text>
        </View>
        <Text style={[styles.penaltyVs, { color: themeColors.icon }]}>VS</Text>
        <View style={styles.penaltyScoreItem}>
          <Text style={styles.penaltyScoreLabel}>KEEPER</Text>
          <Text style={[styles.penaltyScoreNum, { color: '#FF5252' }]}>{score.keeper}</Text>
        </View>
      </View>
      <Text style={[styles.penaltyRound, { color: themeColors.icon }]}>
        Round {Math.min(round + 1, 5)} / 5
      </Text>
      {/* Goal net */}
      <View style={styles.goalNet}>
        {GOAL_CELLS.map((cell) => {
          const hist = history.find((h) => h.cell === cell.id);
          return (
            <TouchableOpacity
              key={cell.id}
              onPress={() => shoot(cell.id)}
              disabled={done || shooting}
              style={[
                styles.goalCell,
                {
                  backgroundColor: hist
                    ? hist.saved
                      ? 'rgba(255,82,82,0.4)'
                      : 'rgba(0,230,118,0.4)'
                    : 'rgba(0,200,255,0.07)',
                  borderColor: themeColors.border,
                },
              ]}>
              {hist ? (
                <Text style={{ fontSize: 22 }}>{hist.saved ? '🧤' : '⚽'}</Text>
              ) : (
                <MaterialCommunityIcons name="soccer-field" size={22} color={themeColors.icon} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      {!done && !shooting && (
        <Text style={[styles.penaltyHint, { color: themeColors.icon }]}>
          Tap a cell to aim your shot
        </Text>
      )}
      {done && (
        <Animated.View entering={FadeInUp} style={styles.penaltyResult}>
          <Text style={styles.penaltyResultText}>
            {score.you > score.keeper
              ? '🏆 You Win!'
              : score.you === score.keeper
                ? '🤝 Draw!'
                : '😔 Keeper Wins'}
          </Text>
          <TouchableOpacity onPress={reset} style={styles.penaltyReplayBtn}>
            <Text style={styles.penaltyReplayText}>Play Again</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </GlassCard>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function FanEngagement() {
  const { theme, themeColors } = useGlobalContext();

  const [activeTab, setActiveTab] = useState<Tab>('FANZONE');

  // Fan Zone - Quiz
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);

  // Predict
  const [predWinner, setPredWinner] = useState('');
  const [predScore, setPredScore] = useState('');
  const [predScorer, setPredScorer] = useState('');
  const [predMotm, setPredMotm] = useState('');
  const [predSubmitted, setPredSubmitted] = useState(false);

  // Polls
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({});

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(INIT_CHAT);
  const [chatInput, setChatInput] = useState('');
  const [reactionMsg, setReactionMsg] = useState<string | null>(null);
  const chatRef = useRef<ScrollView>(null);

  // Selfie
  const [selfieFrame, setSelfieFrame] = useState('bra');
  const [selfieCapture, setSelfieCapture] = useState(false);

  // Rewards wallet
  const [coins] = useState(2840);
  const [xpTotal] = useState(4750);
  const [xpLevel] = useState(35);
  const xpForNextLevel = 5000;
  const xpProgress = (xpTotal / xpForNextLevel) * 100;

  // AI assistant
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<{ q: string; a: string }[]>([
    { q: 'Hello! Ask me anything about rewards, predictions or the leaderboard.', a: '' },
  ]);

  // Spin
  const [spinLog, setSpinLog] = useState<string[]>([]);

  // Challenge daily
  const [challenges] = useState([
    { id: 'c1', title: 'Answer 3 Quiz Questions', icon: 'brain', reward: '150 XP', done: true },
    {
      id: 'c2',
      title: 'Make a Match Prediction',
      icon: 'crystal-ball',
      reward: '100 XP',
      done: false,
    },
    { id: 'c3', title: 'Send 5 Chat Messages', icon: 'chat', reward: '80 XP', done: false },
    { id: 'c4', title: 'Vote in 2 Polls', icon: 'poll', reward: '60 XP', done: false },
    { id: 'c5', title: 'Visit Rewards Store', icon: 'shopping', reward: '50 XP', done: false },
  ]);

  const sendChat = useCallback(() => {
    if (!chatInput.trim()) return;
    const msg: ChatMsg = {
      id: Date.now().toString(),
      user: 'Alex J.',
      avatar: '🇺🇸',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, msg]);
    setChatInput('');
    setTimeout(() => chatRef.current?.scrollToEnd({ animated: true }), 100);
  }, [chatInput]);

  const sendAI = useCallback(() => {
    if (!aiInput.trim()) return;
    const q = aiInput.trim();
    setAiInput('');
    const faq = AI_FAQ.find((f) => f.q.toLowerCase().includes(q.toLowerCase().slice(0, 6)));
    const answer = faq
      ? faq.a
      : 'Great question! Check the specific tab for detailed info. The Fan Zone, Rewards, and Leaderboard tabs have everything you need. Type a keyword like "XP", "spin", "predict", or "store" to get started!';
    setAiHistory((h) => [...h, { q, a: answer }]);
  }, [aiInput]);

  const handleQuizAnswer = (optIdx: number) => {
    if (quizAnswered !== null) return;
    setQuizAnswered(optIdx);
    if (optIdx === QUIZ_QUESTIONS[quizIdx].answer) {
      setQuizScore((s) => s + 1);
    }
    setTimeout(() => {
      if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
        setQuizDone(true);
      } else {
        setQuizIdx((i) => i + 1);
        setQuizAnswered(null);
      }
    }, 800);
  };

  // ── Tab content renderers ──────────────────────────────────────────────────

  const renderFanZone = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Daily Challenges */}
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>🎯 Daily Challenges</Text>
        {challenges.map((ch, i) => (
          <Animated.View key={ch.id} entering={SlideInRight.delay(i * 60)}>
            <GlassCard style={styles.challengeCard}>
              <MaterialCommunityIcons
                name={ch.icon as any}
                size={28}
                color={ch.done ? '#00E676' : themeColors.tint}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.challengeTitle, { color: themeColors.text }]}>{ch.title}</Text>
                <Text
                  style={[
                    styles.challengeReward,
                    { color: ch.done ? '#00E676' : themeColors.tint },
                  ]}>
                  {ch.done ? '✅ Completed' : `Reward: ${ch.reward}`}
                </Text>
              </View>
              {!ch.done && (
                <TouchableOpacity
                  onPress={() => Alert.alert('Challenge', `Complete: ${ch.title}`)}
                  style={styles.challengeBtn}>
                  <Text style={styles.challengeBtnText}>GO</Text>
                </TouchableOpacity>
              )}
            </GlassCard>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Football Quiz */}
      <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 24 }]}>
        🧠 Football Quiz
      </Text>
      <GlassCard style={styles.quizCard}>
        {quizDone ? (
          <View style={styles.quizDone}>
            <Text style={styles.quizDoneEmoji}>🏆</Text>
            <Text style={[styles.quizDoneScore, { color: themeColors.text }]}>
              {quizScore}/{QUIZ_QUESTIONS.length} Correct!
            </Text>
            <Text style={[styles.quizDoneXP, { color: '#00E676' }]}>
              +{quizScore * 50} XP Earned
            </Text>
            <TouchableOpacity
              onPress={() => {
                setQuizIdx(0);
                setQuizScore(0);
                setQuizDone(false);
                setQuizAnswered(null);
              }}
              style={[styles.quizRetry, { backgroundColor: themeColors.tint }]}>
              <Text style={styles.quizRetryText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[styles.quizCounter, { color: themeColors.icon }]}>
              Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}
            </Text>
            <Text style={[styles.quizQuestion, { color: themeColors.text }]}>
              {QUIZ_QUESTIONS[quizIdx].q}
            </Text>
            <View style={styles.quizOptions}>
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                const isCorrect = i === QUIZ_QUESTIONS[quizIdx].answer;
                const isSelected = quizAnswered === i;
                let bg = themeColors.card;
                if (quizAnswered !== null && isCorrect) bg = 'rgba(0,230,118,0.25)';
                else if (isSelected && !isCorrect) bg = 'rgba(255,82,82,0.25)';
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleQuizAnswer(i)}
                    disabled={quizAnswered !== null}
                    style={[
                      styles.quizOption,
                      { backgroundColor: bg, borderColor: themeColors.border },
                    ]}>
                    <Text style={[styles.quizOptionText, { color: themeColors.text }]}>{opt}</Text>
                    {quizAnswered !== null && isCorrect && (
                      <MaterialCommunityIcons name="check-circle" size={18} color="#00E676" />
                    )}
                    {isSelected && !isCorrect && (
                      <MaterialCommunityIcons name="close-circle" size={18} color="#FF5252" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </GlassCard>

      {/* Lucky Spin */}
      <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 24 }]}>
        🎰 Lucky Spin
      </Text>
      <GlassCard style={{ padding: Theme.spacing.l }}>
        <SpinWheel
          onResult={(prize) => setSpinLog((l) => [`You won: ${prize}`, ...l.slice(0, 3)])}
        />
        {spinLog.length > 0 && (
          <View style={{ marginTop: 12 }}>
            {spinLog.map((log, i) => (
              <Text key={i} style={[styles.spinLogText, { color: themeColors.icon }]}>
                • {log}
              </Text>
            ))}
          </View>
        )}
      </GlassCard>

      {/* Scratch Card */}
      <View style={{ marginTop: 24 }}>
        <ScratchCard />
      </View>

      {/* Penalty Shootout */}
      <View style={{ marginTop: 24, marginBottom: 40 }}>
        <PenaltyShootout />
      </View>
    </ScrollView>
  );

  const renderPredict = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>🔮 Match Prediction</Text>
        <Text style={[styles.subLabel, { color: themeColors.icon }]}>
          Brazil vs Argentina · Group Stage
        </Text>

        {predSubmitted ? (
          <GlassCard style={styles.predDoneCard}>
            <Text style={styles.predDoneEmoji}>✅</Text>
            <Text style={[styles.predDoneTitle, { color: themeColors.text }]}>
              Prediction Locked In!
            </Text>
            <View style={styles.predSummary}>
              {[
                { label: 'Winner', value: predWinner },
                { label: 'Score', value: predScore },
                { label: 'First Scorer', value: predScorer },
                { label: 'MOTM', value: predMotm },
              ].map(({ label, value }) => (
                <View key={label} style={styles.predSummaryRow}>
                  <Text style={[styles.predSummaryLabel, { color: themeColors.icon }]}>
                    {label}
                  </Text>
                  <Text style={[styles.predSummaryValue, { color: themeColors.text }]}>
                    {value || '—'}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>🎯 Confidence Score: 82%</Text>
            </View>
            <TouchableOpacity
              onPress={() => setPredSubmitted(false)}
              style={[styles.predEditBtn, { borderColor: themeColors.tint }]}>
              <Text style={[styles.predEditText, { color: themeColors.tint }]}>
                Edit Prediction
              </Text>
            </TouchableOpacity>
          </GlassCard>
        ) : (
          <>
            {[
              {
                label: '🏆 Match Winner',
                placeholder: 'Brazil / Argentina / Draw',
                val: predWinner,
                set: setPredWinner,
              },
              {
                label: '⚽ Final Score (e.g. 2-1)',
                placeholder: 'e.g. 2-1',
                val: predScore,
                set: setPredScore,
              },
              {
                label: '🥇 First Goal Scorer',
                placeholder: 'Player name',
                val: predScorer,
                set: setPredScorer,
              },
              {
                label: '⭐ Man of the Match',
                placeholder: 'Player name',
                val: predMotm,
                set: setPredMotm,
              },
            ].map(({ label, placeholder, val, set }) => (
              <GlassCard key={label} style={styles.predField}>
                <Text style={[styles.predLabel, { color: themeColors.icon }]}>{label}</Text>
                <TextInput
                  value={val}
                  onChangeText={set}
                  placeholder={placeholder}
                  placeholderTextColor={themeColors.icon}
                  style={[
                    styles.predInput,
                    { color: themeColors.text, borderColor: themeColors.border },
                  ]}
                />
              </GlassCard>
            ))}

            {/* Possession Slider */}
            <GlassCard style={styles.predField}>
              <Text style={[styles.predLabel, { color: themeColors.icon }]}>
                📊 Predicted Possession %
              </Text>
              <View style={styles.possessionRow}>
                <Text style={[styles.possessionTeam, { color: themeColors.text }]}>Brazil 58%</Text>
                <View style={[styles.possBarBg, { backgroundColor: themeColors.border }]}>
                  <View
                    style={[styles.possBarFill, { width: '58%', backgroundColor: '#009C3B' }]}
                  />
                </View>
                <Text style={[styles.possessionTeam, { color: themeColors.text }]}>42%</Text>
              </View>
            </GlassCard>

            <TouchableOpacity
              onPress={() => {
                if (!predWinner) {
                  Alert.alert('Missing', 'Please enter match winner prediction');
                  return;
                }
                setPredSubmitted(true);
              }}
              style={styles.predSubmitBtn}>
              <LinearGradient
                colors={['#7C4DFF', '#00C8FF']}
                style={styles.predSubmitGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.predSubmitText}>🔮 LOCK IN PREDICTION</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </ScrollView>
  );

  const renderRewards = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        {/* Wallet */}
        <LinearGradient
          colors={['rgba(124,77,255,0.3)', 'rgba(0,200,255,0.15)']}
          style={styles.walletCard}>
          <Text style={[styles.walletTitle, { color: '#FFF' }]}>💰 My Wallet</Text>
          <View style={styles.walletRow}>
            <View style={styles.walletItem}>
              <MaterialCommunityIcons name="star-circle" size={28} color="#FFD700" />
              <Text style={styles.walletAmount}>{coins.toLocaleString()}</Text>
              <Text style={styles.walletLabel}>Coins</Text>
            </View>
            <View style={styles.walletDivider} />
            <View style={styles.walletItem}>
              <MaterialCommunityIcons name="lightning-bolt" size={28} color="#00C8FF" />
              <Text style={styles.walletAmount}>{xpTotal.toLocaleString()}</Text>
              <Text style={styles.walletLabel}>XP Total</Text>
            </View>
            <View style={styles.walletDivider} />
            <View style={styles.walletItem}>
              <MaterialCommunityIcons name="trophy" size={28} color="#FF9800" />
              <Text style={styles.walletAmount}>14,750</Text>
              <Text style={styles.walletLabel}>Points</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Level Progress */}
        <GlassCard style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={[styles.levelTitle, { color: themeColors.text }]}>Level {xpLevel}</Text>
            <Text style={[styles.levelSub, { color: themeColors.icon }]}>
              {xpTotal.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
            </Text>
          </View>
          <View style={[styles.levelBarBg, { backgroundColor: themeColors.border }]}>
            <Animated.View style={[styles.levelBarFill, { width: `${xpProgress}%` as any }]}>
              <LinearGradient
                colors={['#7C4DFF', '#00C8FF']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
          <Text style={[styles.levelNote, { color: themeColors.icon }]}>
            {(xpForNextLevel - xpTotal).toLocaleString()} XP to Level {xpLevel + 1}
          </Text>
        </GlassCard>

        {/* Recent rewards */}
        <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 20 }]}>
          🎁 Recent Rewards
        </Text>
        {[
          {
            icon: 'rotate-3d-variant',
            label: 'Lucky Spin',
            amount: '+200 XP',
            time: '2h ago',
            color: '#7C4DFF',
          },
          {
            icon: 'brain',
            label: 'Quiz Completed',
            amount: '+150 XP',
            time: '4h ago',
            color: '#00C8FF',
          },
          {
            icon: 'crystal-ball',
            label: 'Prediction Correct',
            amount: '+500 Points',
            time: '6h ago',
            color: '#FFD700',
          },
          {
            icon: 'chat',
            label: 'Chat Engagement',
            amount: '+80 XP',
            time: '8h ago',
            color: '#00E676',
          },
        ].map((r, i) => (
          <Animated.View key={i} entering={SlideInRight.delay(i * 80)}>
            <GlassCard style={styles.rewardRow}>
              <View style={[styles.rewardIcon, { backgroundColor: r.color + '20' }]}>
                <MaterialCommunityIcons name={r.icon as any} size={22} color={r.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rewardLabel, { color: themeColors.text }]}>{r.label}</Text>
                <Text style={[styles.rewardTime, { color: themeColors.icon }]}>{r.time}</Text>
              </View>
              <Text style={[styles.rewardAmount, { color: '#00E676' }]}>{r.amount}</Text>
            </GlassCard>
          </Animated.View>
        ))}
      </Animated.View>
    </ScrollView>
  );

  const renderLeaderboard = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          🏆 Global Leaderboard
        </Text>
        {/* Top 3 podium */}
        <GlassCard style={styles.podium}>
          {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((p, i) => {
            const isMiddle = i === 1;
            return (
              <View key={p.rank} style={[styles.podiumItem, isMiddle && styles.podiumMiddle]}>
                <Text style={styles.podiumAvatar}>{p.country}</Text>
                <Text style={[styles.podiumBadge]}>{p.badge}</Text>
                <Text style={[styles.podiumName, { color: themeColors.text }]}>{p.name}</Text>
                <Text style={[styles.podiumPoints, { color: themeColors.tint }]}>
                  {p.points.toLocaleString()}
                </Text>
                <View
                  style={[
                    styles.podiumRankBadge,
                    {
                      backgroundColor:
                        p.rank === 1 ? '#FFD700' : p.rank === 2 ? '#C0C0C0' : '#CD7F32',
                    },
                  ]}>
                  <Text style={styles.podiumRankText}>#{p.rank}</Text>
                </View>
              </View>
            );
          })}
        </GlassCard>

        {/* Full list */}
        {LEADERBOARD.map((p, i) => (
          <Animated.View key={p.rank} entering={SlideInRight.delay(i * 60)}>
            <GlassCard
              style={[
                styles.leaderRow,
                p.name === 'Alex J.' && { borderColor: '#7C4DFF', borderWidth: 1.5 },
              ]}>
              <Text
                style={[styles.leaderRank, { color: p.rank <= 3 ? '#FFD700' : themeColors.icon }]}>
                #{p.rank}
              </Text>
              <Text style={styles.leaderFlag}>{p.country}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.leaderName, { color: themeColors.text }]}>
                  {p.name} {p.name === 'Alex J.' ? '(You)' : ''}
                </Text>
                <Text style={[styles.leaderLevel, { color: themeColors.icon }]}>
                  Level {p.level}
                </Text>
              </View>
              <Text style={styles.leaderBadge}>{p.badge}</Text>
              <Text style={[styles.leaderPoints, { color: themeColors.tint }]}>
                {p.points.toLocaleString()}
              </Text>
            </GlassCard>
          </Animated.View>
        ))}
      </Animated.View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        {/* Avatar & name */}
        <LinearGradient
          colors={['rgba(124,77,255,0.25)', 'rgba(0,200,255,0.1)']}
          style={styles.profileHero}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>🇺🇸</Text>
            <View style={styles.profileLevelBadge}>
              <Text style={styles.profileLevelText}>{xpLevel}</Text>
            </View>
          </View>
          <Text style={[styles.profileName, { color: '#FFF' }]}>Alex Johnson</Text>
          <Text style={[styles.profileSince, { color: 'rgba(255,255,255,0.6)' }]}>
            Fan since 2018 · ⭐ VIP Fan
          </Text>
          <View style={styles.profileStatsRow}>
            {[
              { label: 'Predictions', value: '47' },
              { label: 'Accuracy', value: '72%' },
              { label: 'Rank', value: '#4' },
            ].map(({ label, value }) => (
              <View key={label} style={styles.profileStatItem}>
                <Text style={styles.profileStatValue}>{value}</Text>
                <Text style={styles.profileStatLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Info rows */}
        <GlassCard style={{ padding: Theme.spacing.m, gap: 12 }}>
          {[
            { icon: 'heart', label: 'Favorite Team', value: '🇧🇷 Brazil' },
            { icon: 'soccer', label: 'Matches Attended', value: '8 matches' },
            { icon: 'food-fork-drink', label: 'Food Orders', value: '23 orders' },
            { icon: 'ticket-confirmation', label: 'Tickets Booked', value: '12 tickets' },
            { icon: 'crystal-ball', label: 'Prediction Accuracy', value: '72% (34/47)' },
          ].map(({ icon, label, value }) => (
            <View key={label} style={styles.profileInfoRow}>
              <MaterialCommunityIcons name={icon as any} size={20} color={themeColors.tint} />
              <Text style={[styles.profileInfoLabel, { color: themeColors.icon }]}>{label}</Text>
              <Text style={[styles.profileInfoValue, { color: themeColors.text }]}>{value}</Text>
            </View>
          ))}
        </GlassCard>

        {/* Match History */}
        <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 20 }]}>
          📅 Match History
        </Text>
        {[
          {
            match: 'Brazil vs Argentina',
            result: 'Brazil 2-1',
            score: '✅ Correct',
            date: 'Jul 10',
          },
          { match: 'France vs England', result: 'France 1-0', score: '❌ Wrong', date: 'Jul 8' },
          { match: 'Spain vs Germany', result: 'Spain 2-2', score: '✅ Correct', date: 'Jul 6' },
        ].map((m, i) => (
          <GlassCard key={i} style={styles.matchHistoryRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.matchHistoryMatch, { color: themeColors.text }]}>{m.match}</Text>
              <Text style={[styles.matchHistoryResult, { color: themeColors.icon }]}>
                {m.result} · {m.date}
              </Text>
            </View>
            <Text style={styles.matchHistoryScore}>{m.score}</Text>
          </GlassCard>
        ))}
      </Animated.View>
    </ScrollView>
  );

  const renderSelfie = () => {
    const selectedFrame = TEAM_FRAMES.find((f) => f.id === selfieFrame);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(400)}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>📸 AI Selfie Booth</Text>
          {/* Mock camera frame */}
          <View style={styles.selfieViewport}>
            <LinearGradient
              colors={['#0d1b30', '#1a0535']}
              style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
            />
            {/* Border frame */}
            <View
              style={[styles.selfieFrame, { borderColor: selectedFrame?.color || '#7C4DFF' }]}
            />
            {/* Mock avatar */}
            <Text style={styles.selfieEmoji}>😎</Text>
            <View
              style={[styles.selfieBadge, { backgroundColor: selectedFrame?.color || '#7C4DFF' }]}>
              <Text style={styles.selfieBadgeText}>{selectedFrame?.label}</Text>
            </View>
            {selfieCapture && (
              <Animated.View entering={FadeInUp.duration(300)} style={styles.selfieFlash} />
            )}
          </View>

          {/* Frame picker */}
          <Text style={[styles.selfiePickerTitle, { color: themeColors.text }]}>
            Choose Team Frame
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.selfieFrameScroll}>
            {TEAM_FRAMES.map((f) => (
              <TouchableOpacity
                key={f.id}
                onPress={() => setSelfieFrame(f.id)}
                style={[
                  styles.selfieFrameChip,
                  {
                    backgroundColor: selfieFrame === f.id ? f.color + '30' : themeColors.card,
                    borderColor: selfieFrame === f.id ? f.color : themeColors.border,
                  },
                ]}>
                <Text style={[styles.selfieFrameChipText, { color: themeColors.text }]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Buttons */}
          <View style={styles.selfieButtons}>
            <TouchableOpacity
              onPress={() => {
                setSelfieCapture(true);
                setTimeout(() => setSelfieCapture(false), 500);
                Alert.alert('📸 Captured!', 'Your selfie has been saved to your gallery!');
              }}
              style={[styles.selfieBtn, { backgroundColor: '#7C4DFF' }]}>
              <MaterialCommunityIcons name="camera" size={22} color="#FFF" />
              <Text style={styles.selfieBtnText}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('🔗 Share', 'Opening share sheet…')}
              style={[styles.selfieBtn, { backgroundColor: '#00C8FF' }]}>
              <MaterialCommunityIcons name="share-variant" size={22} color="#FFF" />
              <Text style={styles.selfieBtnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('⬇️ Download', 'Image saved!')}
              style={[styles.selfieBtn, { backgroundColor: '#00E676' }]}>
              <MaterialCommunityIcons name="download" size={22} color="#FFF" />
              <Text style={styles.selfieBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    );
  };

  const renderPolls = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>📊 Live Fan Polls</Text>
        {POLLS.map((poll, pi) => {
          const voted = pollVotes[poll.id] !== undefined;
          const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
          return (
            <GlassCard key={poll.id} style={styles.pollCard}>
              <Text style={[styles.pollQuestion, { color: themeColors.text }]}>
                {poll.question}
              </Text>
              {poll.options.map((opt, oi) => (
                <TouchableOpacity
                  key={oi}
                  onPress={() => {
                    if (!voted) setPollVotes((v) => ({ ...v, [poll.id]: oi }));
                  }}
                  disabled={voted}
                  style={[
                    styles.pollOptionBtn,
                    {
                      borderColor:
                        voted && pollVotes[poll.id] === oi ? themeColors.tint : themeColors.border,
                    },
                  ]}>
                  <PollBar
                    label={opt.label}
                    votes={opt.votes}
                    totalVotes={totalVotes}
                    voted={voted}
                  />
                </TouchableOpacity>
              ))}
              <Text style={[styles.pollTotal, { color: themeColors.icon }]}>
                {voted ? `${totalVotes.toLocaleString()} total votes` : 'Tap to vote'}
              </Text>
            </GlassCard>
          );
        })}
      </Animated.View>
    </ScrollView>
  );

  const renderChat = () => (
    <View style={{ flex: 1 }}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>💬 Fan Chat</Text>
      {/* Emoji reactions banner */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiBar}>
        {['⚽', '🔥', '❤️', '👏', '😮', '😂', '🏆', '💪'].map((em) => (
          <TouchableOpacity key={em} onPress={() => setReactionMsg(em)} style={styles.emojiBtn}>
            <Text style={styles.emojiText}>{em}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {reactionMsg && (
        <Animated.Text entering={FadeInUp.duration(300)} style={styles.reactionFloat}>
          {reactionMsg}
        </Animated.Text>
      )}
      <ScrollView
        ref={chatRef}
        style={styles.chatList}
        contentContainerStyle={{ padding: Theme.spacing.m, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        {chatMessages.map((msg) => (
          <View key={msg.id} style={[styles.chatBubble, msg.pinned && styles.chatPinned]}>
            <Text style={styles.chatAvatar}>{msg.avatar}</Text>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Text style={[styles.chatUser, { color: themeColors.tint }]}>{msg.user}</Text>
                {msg.pinned && (
                  <View style={styles.pinnedBadge}>
                    <Text style={styles.pinnedText}>📌 PINNED</Text>
                  </View>
                )}
                <Text style={[styles.chatTime, { color: themeColors.icon }]}>{msg.time}</Text>
              </View>
              <Text style={[styles.chatText, { color: themeColors.text }]}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View
        style={[
          styles.chatInputRow,
          { backgroundColor: themeColors.card, borderColor: themeColors.border },
        ]}>
        <TextInput
          value={chatInput}
          onChangeText={setChatInput}
          placeholder="Say something to the crowd…"
          placeholderTextColor={themeColors.icon}
          style={[styles.chatInput, { color: themeColors.text }]}
        />
        <TouchableOpacity
          onPress={sendChat}
          style={[styles.chatSend, { backgroundColor: themeColors.tint }]}>
          <MaterialCommunityIcons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStore = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>🛍 Rewards Store</Text>
        <GlassCard style={styles.storeBalance}>
          <MaterialCommunityIcons name="star-circle" size={24} color="#FFD700" />
          <Text style={[styles.storeBalanceText, { color: themeColors.text }]}>
            Balance: {coins.toLocaleString()} Coins
          </Text>
        </GlassCard>
        {['Food', 'Merch', 'VIP', 'Digital'].map((cat) => (
          <View key={cat}>
            <Text style={[styles.storeCatTitle, { color: themeColors.icon }]}>{cat}</Text>
            <View style={styles.storeGrid}>
              {STORE_ITEMS.filter((s) => s.category === cat).map((item) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInUp.delay(100)}
                  style={styles.storeItemWrap}>
                  <GlassCard style={styles.storeItem}>
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={36}
                      color={themeColors.tint}
                    />
                    <Text style={[styles.storeItemTitle, { color: themeColors.text }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.storeItemCost, { color: '#FFD700' }]}>
                      💰 {item.cost.toLocaleString()} Coins
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        coins >= item.cost
                          ? Alert.alert(
                              '✅ Redeemed!',
                              `${item.title} has been added to your account!`
                            )
                          : Alert.alert(
                              '❌ Insufficient Coins',
                              'Earn more coins to redeem this item.'
                            )
                      }
                      style={[
                        styles.storeRedeemBtn,
                        { backgroundColor: coins >= item.cost ? '#7C4DFF' : '#546E7A' },
                      ]}>
                      <Text style={styles.storeRedeemText}>Redeem</Text>
                    </TouchableOpacity>
                  </GlassCard>
                </Animated.View>
              ))}
            </View>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );

  const renderBadges = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>🏅 Achievements</Text>
        <Text style={[styles.subLabel, { color: themeColors.icon }]}>
          {ACHIEVEMENTS.filter((a) => a.unlocked).length}/{ACHIEVEMENTS.length} unlocked · Tap
          locked badges to preview
        </Text>
        <View style={styles.badgesGrid}>
          {ACHIEVEMENTS.map((a) => (
            <AnimatedBadge
              key={a.id}
              unlocked={a.unlocked}
              icon={a.icon}
              title={a.title}
              xp={a.xp}
              desc={a.desc}
              progress={a.progress}
              total={a.total}
            />
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );

  const renderAI = () => (
    <View style={{ flex: 1 }}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>🤖 AI Fan Assistant</Text>
      <Text style={[styles.subLabel, { color: themeColors.icon, marginBottom: 12 }]}>
        Ask about rewards, predictions, leaderboard & more
      </Text>
      {/* FAQ chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        {AI_FAQ.map((faq) => (
          <TouchableOpacity
            key={faq.q}
            onPress={() => {
              setAiHistory((h) => [...h, { q: faq.q.replace(/^[^a-zA-Z]+/, ''), a: faq.a }]);
            }}
            style={[
              styles.aiFaqChip,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.aiFaqText, { color: themeColors.tint }]}>{faq.q}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.aiChat}
        contentContainerStyle={{ padding: Theme.spacing.m, paddingBottom: 20 }}>
        {aiHistory.map((item, i) => (
          <View key={i}>
            {item.q !== 'Hello! Ask me anything about rewards, predictions or the leaderboard.' && (
              <View style={styles.aiUserBubble}>
                <Text style={styles.aiUserText}>{item.q}</Text>
              </View>
            )}
            {(item.a || i === 0) && (
              <Animated.View
                entering={FadeInUp.duration(300)}
                style={[
                  styles.aiBotBubble,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <Text style={styles.aiBotIcon}>🤖</Text>
                <Text style={[styles.aiBotText, { color: themeColors.text }]}>
                  {i === 0
                    ? 'Hello! Ask me anything about rewards, predictions or the leaderboard.'
                    : item.a}
                </Text>
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.aiInputRow,
          { backgroundColor: themeColors.card, borderColor: themeColors.border },
        ]}>
        <TextInput
          value={aiInput}
          onChangeText={setAiInput}
          placeholder="Ask about XP, spin, predict, store…"
          placeholderTextColor={themeColors.icon}
          style={[styles.aiInput, { color: themeColors.text }]}
          onSubmitEditing={sendAI}
        />
        <TouchableOpacity onPress={sendAI} style={[styles.aiSend, { backgroundColor: '#7C4DFF' }]}>
          <MaterialCommunityIcons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const RENDERERS: Record<Tab, () => React.ReactNode> = {
    FANZONE: renderFanZone,
    PREDICT: renderPredict,
    REWARDS: renderRewards,
    LEADERS: renderLeaderboard,
    PROFILE: renderProfile,
    SELFIE: renderSelfie,
    POLLS: renderPolls,
    CHAT: renderChat,
    STORE: renderStore,
    BADGES: renderBadges,
    AI: renderAI,
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <LinearGradient colors={[themeColors.gradientStart, themeColors.gradientEnd]} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />
      <Header title="🎮 Fan Engagement" />

      {/* Tab Scroller */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          styles.tabBar,
          { backgroundColor: themeColors.background, borderBottomColor: themeColors.border },
        ]}
        contentContainerStyle={styles.tabBarContent}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tabBtn,
                isActive && { borderBottomColor: themeColors.tint, borderBottomWidth: 2 },
              ]}>
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={16}
                color={isActive ? themeColors.tint : themeColors.icon}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? themeColors.tint : themeColors.icon },
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tab Content */}
      <View style={styles.tabContent}>{RENDERERS[activeTab]()}</View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Tab bar
  tabBar: { borderBottomWidth: 1, maxHeight: 52, flexGrow: 0 },
  tabBarContent: { paddingHorizontal: Theme.spacing.s, alignItems: 'center' },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: Theme.spacing.s,
    marginRight: 2,
  },
  tabLabel: { fontSize: 12, fontWeight: '700' },
  tabContent: { flex: 1, padding: Theme.spacing.m },

  // Section
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: '900',
    marginBottom: Theme.spacing.m,
    letterSpacing: 0.5,
  },
  subLabel: { fontSize: 13, marginTop: -8, marginBottom: 12 },

  // Challenge
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  challengeTitle: { fontSize: 14, fontWeight: '700' },
  challengeReward: { fontSize: 12, marginTop: 2 },
  challengeBtn: {
    backgroundColor: '#7C4DFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  challengeBtnText: { color: '#FFF', fontWeight: '900', fontSize: 12 },

  // Quiz
  quizCard: { padding: Theme.spacing.l },
  quizCounter: { fontSize: 12, marginBottom: 8 },
  quizQuestion: { fontSize: 16, fontWeight: '700', marginBottom: 16, lineHeight: 22 },
  quizOptions: { gap: 10 },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  quizOptionText: { fontSize: 14, fontWeight: '600' },
  quizDone: { alignItems: 'center', gap: 8, paddingVertical: 20 },
  quizDoneEmoji: { fontSize: 48 },
  quizDoneScore: { fontSize: 22, fontWeight: '900' },
  quizDoneXP: { fontSize: 16, fontWeight: '700' },
  quizRetry: {
    marginTop: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  quizRetryText: { color: '#FFF', fontWeight: '900', fontSize: 15 },

  // Spin Wheel
  spinContainer: { alignItems: 'center', gap: 16 },
  spinResult: { alignItems: 'center', gap: 4 },
  spinResultEmoji: { fontSize: 32 },
  spinResultText: { fontSize: 18, fontWeight: '900', color: '#FFD700' },
  spinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
  },
  spinBtnText: { color: '#FFF', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  spinHint: { fontSize: 12 },
  spinLogText: { fontSize: 12, marginTop: 2 },

  // Scratch
  scratchContainer: { padding: Theme.spacing.l, alignItems: 'center', gap: 16 },
  scratchTitle: { fontSize: 16, fontWeight: '900', color: '#FFD700' },
  scratchCard: {
    width: 240,
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scratchPrize: { fontSize: 26, fontWeight: '900', color: '#FFD700', zIndex: 1 },
  scratchCover: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    zIndex: 2,
  },
  scratchHint: { color: 'rgba(255,255,255,0.8)', fontWeight: '700', fontSize: 14 },
  scratchCongrats: { fontSize: 14, color: '#00E676', fontWeight: '700', textAlign: 'center' },

  // Penalty
  penaltyContainer: { padding: Theme.spacing.l },
  penaltyTitle: { fontSize: 18, fontWeight: '900', color: '#FFD700', marginBottom: 12 },
  penaltyScore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    marginBottom: 8,
  },
  penaltyScoreItem: { alignItems: 'center', gap: 2 },
  penaltyScoreLabel: { fontSize: 11, fontWeight: '700', color: '#8F9BB3' },
  penaltyScoreNum: { fontSize: 40, fontWeight: '900' },
  penaltyVs: { fontSize: 18, fontWeight: '700' },
  penaltyRound: { textAlign: 'center', fontSize: 13, marginBottom: 16 },
  goalNet: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  goalCell: {
    width: 80,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  penaltyHint: { textAlign: 'center', fontSize: 12, marginTop: 12 },
  penaltyResult: { alignItems: 'center', marginTop: 16, gap: 12 },
  penaltyResultText: { fontSize: 20, fontWeight: '900', color: '#FFD700' },
  penaltyReplayBtn: {
    backgroundColor: '#7C4DFF',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },
  penaltyReplayText: { color: '#FFF', fontWeight: '900' },

  // Predict
  predField: { padding: Theme.spacing.m, marginBottom: Theme.spacing.s },
  predLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  predInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  predSubmitBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 8 },
  predSubmitGrad: { paddingVertical: 16, alignItems: 'center' },
  predSubmitText: { color: '#FFF', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  predDoneCard: { padding: Theme.spacing.l, alignItems: 'center', gap: 12 },
  predDoneEmoji: { fontSize: 48 },
  predDoneTitle: { fontSize: 20, fontWeight: '900' },
  predSummary: { width: '100%', gap: 8 },
  predSummaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  predSummaryLabel: { fontSize: 13 },
  predSummaryValue: { fontSize: 13, fontWeight: '700' },
  confidenceBadge: {
    backgroundColor: 'rgba(0,230,118,0.15)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00E676',
  },
  confidenceText: { color: '#00E676', fontWeight: '700' },
  predEditBtn: {
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  predEditText: { fontWeight: '700' },
  possessionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  possessionTeam: { fontSize: 12, fontWeight: '700', width: 60 },
  possBarBg: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  possBarFill: { height: '100%', borderRadius: 4 },

  // Rewards
  walletCard: {
    borderRadius: 20,
    padding: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
  },
  walletTitle: { fontSize: 16, fontWeight: '900', marginBottom: 16 },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletItem: { alignItems: 'center', gap: 4, flex: 1 },
  walletDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.15)' },
  walletAmount: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  walletLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  levelCard: { padding: Theme.spacing.l, gap: 8 },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelTitle: { fontSize: 18, fontWeight: '900' },
  levelSub: { fontSize: 12 },
  levelBarBg: { height: 10, borderRadius: 5, overflow: 'hidden' },
  levelBarFill: { height: '100%', borderRadius: 5 },
  levelNote: { fontSize: 12 },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: Theme.spacing.m,
    marginBottom: 8,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardLabel: { fontSize: 14, fontWeight: '700' },
  rewardTime: { fontSize: 12, marginTop: 2 },
  rewardAmount: { fontSize: 14, fontWeight: '900' },

  // Leaderboard
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 16,
    padding: 20,
    marginBottom: 16,
  },
  podiumItem: { alignItems: 'center', gap: 4 },
  podiumMiddle: { marginBottom: 16 },
  podiumAvatar: { fontSize: 28 },
  podiumBadge: { fontSize: 20 },
  podiumName: { fontSize: 12, fontWeight: '700' },
  podiumPoints: { fontSize: 12, fontWeight: '900' },
  podiumRankBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  podiumRankText: { color: '#FFF', fontWeight: '900', fontSize: 12 },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 8,
  },
  leaderRank: { width: 28, fontWeight: '900', fontSize: 15 },
  leaderFlag: { fontSize: 22 },
  leaderName: { fontSize: 14, fontWeight: '700' },
  leaderLevel: { fontSize: 12 },
  leaderBadge: { fontSize: 18 },
  leaderPoints: { fontSize: 14, fontWeight: '900' },

  // Profile
  profileHero: {
    borderRadius: 20,
    padding: Theme.spacing.l,
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  profileAvatar: { position: 'relative' },
  profileAvatarText: { fontSize: 56 },
  profileLevelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    backgroundColor: '#7C4DFF',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  profileLevelText: { color: '#FFF', fontWeight: '900', fontSize: 11 },
  profileName: { fontSize: 22, fontWeight: '900', marginTop: 4 },
  profileSince: { fontSize: 13 },
  profileStatsRow: { flexDirection: 'row', gap: 32, marginTop: 12 },
  profileStatItem: { alignItems: 'center', gap: 2 },
  profileStatValue: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  profileStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  profileInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  profileInfoLabel: { flex: 1, fontSize: 13 },
  profileInfoValue: { fontSize: 13, fontWeight: '700' },
  matchHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 8,
  },
  matchHistoryMatch: { fontSize: 14, fontWeight: '700' },
  matchHistoryResult: { fontSize: 12, marginTop: 2 },
  matchHistoryScore: { fontSize: 16 },

  // Selfie
  selfieViewport: {
    height: 260,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  selfieFrame: {
    position: 'absolute',
    inset: 12,
    borderWidth: 4,
    borderRadius: 16,
    borderStyle: 'dashed',
  },
  selfieEmoji: { fontSize: 80 },
  selfieBadge: {
    position: 'absolute',
    bottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selfieBadgeText: { color: '#FFF', fontWeight: '900', fontSize: 13 },
  selfieFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
  },
  selfiePickerTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  selfieFrameScroll: { marginBottom: 16 },
  selfieFrameChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 10,
  },
  selfieFrameChipText: { fontSize: 13, fontWeight: '700' },
  selfieButtons: { flexDirection: 'row', gap: 10 },
  selfieBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
  },
  selfieBtnText: { color: '#FFF', fontWeight: '900', fontSize: 14 },

  // Polls
  pollCard: { padding: Theme.spacing.l, marginBottom: Theme.spacing.m },
  pollQuestion: { fontSize: 16, fontWeight: '900', marginBottom: 14 },
  pollOptionBtn: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 8 },
  pollOption: { gap: 4 },
  pollLabel: { fontSize: 14, fontWeight: '700' },
  pollPct: { fontSize: 14, fontWeight: '900' },
  pollBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  pollBarFill: { height: '100%', borderRadius: 4 },
  pollVotes: { fontSize: 11, marginTop: 2 },
  pollTotal: { fontSize: 12, marginTop: 8, textAlign: 'right' },

  // Chat
  emojiBar: { maxHeight: 44, flexGrow: 0, marginBottom: 8 },
  emojiBtn: { paddingHorizontal: 10, paddingVertical: 8 },
  emojiText: { fontSize: 22 },
  reactionFloat: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontSize: 48,
    zIndex: 999,
  },
  chatList: { flex: 1 },
  chatBubble: { flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'flex-start' },
  chatPinned: { backgroundColor: 'rgba(0,200,255,0.08)', borderRadius: 10, padding: 8 },
  chatAvatar: { fontSize: 22 },
  chatUser: { fontSize: 13, fontWeight: '700' },
  chatTime: { fontSize: 11 },
  chatText: { fontSize: 14, marginTop: 2, lineHeight: 20 },
  pinnedBadge: {
    backgroundColor: 'rgba(0,200,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  pinnedText: { fontSize: 10, fontWeight: '700', color: '#00C8FF' },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Theme.spacing.s,
    borderTopWidth: 1,
    borderRadius: 12,
    margin: Theme.spacing.s,
  },
  chatInput: { flex: 1, fontSize: 14, paddingHorizontal: 8 },
  chatSend: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Store
  storeBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 16,
  },
  storeBalanceText: { fontSize: 16, fontWeight: '900' },
  storeCatTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  storeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  storeItemWrap: { width: '47%' },
  storeItem: { padding: Theme.spacing.m, alignItems: 'center', gap: 8 },
  storeItemTitle: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  storeItemCost: { fontSize: 13, fontWeight: '700' },
  storeRedeemBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  storeRedeemText: { color: '#FFF', fontWeight: '900', fontSize: 13 },

  // Badges
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badgeCard: { padding: Theme.spacing.m, alignItems: 'center', gap: 6, width: 160 },
  badgeIcon: { fontSize: 20 },
  badgeTitle: { fontSize: 13, fontWeight: '900', textAlign: 'center' },
  badgeDesc: { fontSize: 11, textAlign: 'center', lineHeight: 14 },
  badgeXP: { fontSize: 13, fontWeight: '900' },
  badgeProgress: { width: '100%', gap: 4 },
  badgeProgressBg: { height: 4, borderRadius: 2, overflow: 'hidden' },
  badgeProgressFill: { height: '100%', borderRadius: 2 },
  badgeProgressText: { fontSize: 10, textAlign: 'right' },

  // AI
  aiFaqChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    maxWidth: 180,
  },
  aiFaqText: { fontSize: 12, fontWeight: '600' },
  aiChat: { flex: 1 },
  aiUserBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#7C4DFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  aiUserText: { color: '#FFF', fontSize: 14 },
  aiBotBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    maxWidth: '90%',
  },
  aiBotIcon: { fontSize: 18 },
  aiBotText: { flex: 1, fontSize: 14, lineHeight: 20 },
  aiInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Theme.spacing.s,
    borderTopWidth: 1,
    borderRadius: 12,
    margin: Theme.spacing.s,
  },
  aiInput: { flex: 1, fontSize: 14, paddingHorizontal: 8 },
  aiSend: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
