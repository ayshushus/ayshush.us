"""Specs for the source+TM-conditioned autocomplete models. French (FR) values are projected
from the measured en-CA (EN_CA) baseline. Run: python -m autocomplete_l10n.specs"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class DataSpec:
    locale_code: str
    locale_name: str
    db_approved: int
    db_tm_entries: int
    extracted_rows: int
    kept_rows: int
    with_tm_rows: int
    split_train: int
    split_val: int
    split_test: int
    tm_cap: int
    tm_match_rate: float
    estimated: bool = False


@dataclass
class TokenizerSpec:
    vocab_size: int
    specials: tuple = ("<pad>", "<bos>", "<eos>", "<src>", "<tgt>", "<tm>")
    pretokenizer: str = "ByteLevel(add_prefix_space=False)"


@dataclass
class ModelSpec:
    d_model: int = 256
    n_layers: int = 6
    n_heads: int = 8
    mlp_ratio: int = 4
    max_seq_len: int = 256
    dropout: float = 0.1
    params_millions: float = 0.0


@dataclass
class TrainSpec:
    epochs: int = 12
    batch_size: int = 96
    lr: float = 3e-4
    warmup_frac: float = 0.03
    lr_end_frac: float = 0.10
    patience: int = 3
    weight_decay: float = 0.01
    buckets: tuple = (32, 64, 128, 256)
    compiled: bool = True


@dataclass
class PromptSpec:
    src_max_tokens: int = 96
    tm_max_tokens: int = 40
    max_tm_refs: int = 2
    loss_on: str = "target span only (everything after <tgt>, incl <eos>)"


@dataclass
class ServeSpec:
    host: str = "127.0.0.1"
    port: int = 8765
    max_new_tokens: int = 24
    min_score: float = -5.0
    healing: str = (
        "split prefix at last word boundary (re r'\\s*\\S*\\Z'); prefill `head` only; "
        "regenerate the whole word in-distribution; keep candidates whose word starts with "
        "the typed remainder; strip typed chars (re-aligning per-token scores); prune "
        "incompatible first tokens before rollout via a precomputed token-string table"
    )


@dataclass
class FrontendSpec:
    gate: str
    debounce_ms: int = 180
    top_k: int = 5
    conf_high: float = 0.6
    tm_blend_quality: int = 95
    endpoint: str = "http://127.0.0.1:8765/complete (override: localStorage.ghostEndpoint)"


@dataclass
class Measured:
    val_loss: float = 0.0
    val_ppl: float = 0.0
    train_seconds: int = 0
    bench_warm_k1_p50_ms: float = 0.0
    bench_warm_k1_p95_ms: float = 0.0
    bench_warm_k5_p50_ms: float = 0.0
    bench_warm_k5_p95_ms: float = 0.0
    bench_typing_p50_ms: float = 0.0
    bench_typing_p95_ms: float = 0.0
    note: str = ""


@dataclass
class LocaleSpec:
    data: DataSpec
    tokenizer: TokenizerSpec
    model: ModelSpec
    train: TrainSpec
    prompt: PromptSpec
    serve: ServeSpec
    frontend: FrontendSpec
    measured: Measured = field(default_factory=Measured)


EN_CA = LocaleSpec(
    data=DataSpec(
        locale_code="en-CA",
        locale_name="English (Canada)",
        db_approved=61_972,
        db_tm_entries=77_033,
        extracted_rows=46_152,
        kept_rows=39_233,
        with_tm_rows=12_758,
        split_train=35_309,
        split_val=1_961,
        split_test=1_963,
        tm_cap=100_000,
        tm_match_rate=16_876 / 46_152,
        estimated=False,
    ),
    tokenizer=TokenizerSpec(vocab_size=8_000),
    model=ModelSpec(d_model=256, n_layers=6, n_heads=8, max_seq_len=256, params_millions=8.90),
    train=TrainSpec(epochs=12, batch_size=96, patience=3),
    prompt=PromptSpec(),
    serve=ServeSpec(),
    frontend=FrontendSpec(gate="localeCode === 'en-CA'"),
    measured=Measured(
        val_loss=0.109, val_ppl=1.1, train_seconds=2_216,
        bench_warm_k1_p50_ms=7.8, bench_warm_k1_p95_ms=20.7,
        bench_warm_k5_p50_ms=11.3, bench_warm_k5_p95_ms=54.0,
        bench_typing_p50_ms=9.4, bench_typing_p95_ms=21.7,
        note=(
            "val ppl 1.1 is very low because en-CA is largely English→English near-identity; "
            "French is real translation, so expect a higher val ppl (~3-8)."
        ),
    ),
)


# FR data is scaled by the measured en-CA ratios: approved→extracted ≈0.745, →kept ≈0.85.
# TM enrichment is capped (en-CA ran ~15.5 rows/s; uncapped French ≈2h) — see FRENCH_DELTA.
FR = LocaleSpec(
    data=DataSpec(
        locale_code="fr",
        locale_name="French",
        db_approved=152_404,
        db_tm_entries=191_467,
        extracted_rows=113_500,
        kept_rows=96_500,
        with_tm_rows=15_000,
        split_train=86_850,
        split_val=4_825,
        split_test=4_825,
        tm_cap=40_000,
        tm_match_rate=EN_CA.data.tm_match_rate,
        estimated=True,
    ),
    tokenizer=TokenizerSpec(vocab_size=12_000),
    model=ModelSpec(d_model=256, n_layers=6, n_heads=8, max_seq_len=256, params_millions=10.95),
    train=TrainSpec(epochs=10, batch_size=96, patience=3),
    prompt=PromptSpec(),
    serve=ServeSpec(),
    frontend=FrontendSpec(gate="['en-CA','fr'].includes(localeCode)"),
    measured=Measured(
        train_seconds=5_700,
        val_ppl=5.0,
        note=(
            "All fr numbers are projections from the en-CA basis until measured. Latency "
            "should match en-CA. Plan: ~43 min extraction (capped TM) + ~1.5 h train."
        ),
    ),
)

# Bigger French model — use ONLY if FR (256/6) plateaus at a high val ppl (>~6).
FR_BIGGER = LocaleSpec(
    data=FR.data,
    tokenizer=TokenizerSpec(vocab_size=12_000),
    model=ModelSpec(d_model=384, n_layers=8, n_heads=8, max_seq_len=256, params_millions=23.0),
    train=TrainSpec(epochs=10, batch_size=64, patience=3),
    prompt=PromptSpec(),
    serve=ServeSpec(),
    frontend=FR.frontend,
    measured=Measured(note="fallback if val ppl > ~6; ~2-3× slower to train than FR"),
)


FRENCH_DELTA = """
1. extract_db.py  — parameterise the locale (currently hard-codes "en-CA"):
       enca = Locale.objects.get(code="en-CA")
   →   loc  = Locale.objects.get(code=os.environ.get("GHOST_LOCALE", "en-CA"))

2. train.py       — bump VOCAB_SIZE 8000 → 12000.

3. ghostText / editFieldExtensions.ts — widen the gate so fr also gets ghost text:
       ...(localeCode === 'en-CA' ? [ghostText({...})] : [])
   →   ...(['en-CA','fr'].includes(localeCode) ? [ghostText({...})] : [])

4. checkpoints    — fr needs its OWN weights (separate dir). Recommended: add `locale` to
   the /complete request + a {locale: Engine} registry in serve.py so ONE server serves
   both en-CA and fr from checkpoints-<locale>/.
"""


def commands(spec: LocaleSpec, ckpt_dir: str | None = None) -> list[str]:
    loc = spec.data.locale_code
    ck = ckpt_dir or f"checkpoints-{loc}"
    return [
        f"docker compose exec -T -e GHOST_LOCALE={loc} -e GHOST_OUT=/tmp/pairs_{loc}.jsonl "
        f"-e GHOST_TM_CAP={spec.data.tm_cap} server "
        f"python manage.py shell -i python < src/autocomplete_l10n/extract_db.py",
        f"docker compose cp server:/tmp/pairs_{loc}.jsonl data/pairs.jsonl",
        f".venv/bin/python -m src.autocomplete_l10n.dataset data/pairs.jsonl data",
        f"CKPT_DIR={ck} .venv/bin/python -m src.autocomplete_l10n.train "
        f"--epochs {spec.train.epochs} --batch-size {spec.train.batch_size} "
        f"--d-model {spec.model.d_model} --layers {spec.model.n_layers}",
        f".venv/bin/python -m src.autocomplete_l10n.bench",
        f".venv/bin/python -m src.autocomplete_l10n.serve",
    ]


def _fmt(spec: LocaleSpec) -> str:
    d, m, t = spec.data, spec.model, spec.train
    tag = "ESTIMATED" if d.estimated else "MEASURED"
    out = [
        f"== {d.locale_name} ({d.locale_code})  [{tag}] ==",
        f"  data    : DB approved={d.db_approved:,}  TM={d.db_tm_entries:,}",
        f"            extracted={d.extracted_rows:,}  kept={d.kept_rows:,}  "
        f"with-tm={d.with_tm_rows:,}  tm_cap={d.tm_cap:,}",
        f"            split train/val/test = {d.split_train:,}/{d.split_val:,}/{d.split_test:,}",
        f"  tokenizer: vocab={spec.tokenizer.vocab_size:,}  specials={len(spec.tokenizer.specials)}",
        f"  model   : d_model={m.d_model} layers={m.n_layers} heads={m.n_heads} "
        f"max_seq={m.max_seq_len}  (~{m.params_millions:.1f}M params)",
        f"  train   : epochs={t.epochs} batch={t.batch_size} lr={t.lr} patience={t.patience} "
        f"compiled={t.compiled}",
        f"  serve   : :{spec.serve.port}  max_new={spec.serve.max_new_tokens} "
        f"min_score={spec.serve.min_score}",
        f"  frontend: gate={spec.frontend.gate}  debounce={spec.frontend.debounce_ms}ms "
        f"top_k={spec.frontend.top_k} conf_high={spec.frontend.conf_high}",
    ]
    me = spec.measured
    if me.val_ppl:
        out.append(
            f"  results : val_ppl={me.val_ppl}  train≈{me.train_seconds//60} min"
            + (f"  bench k1 p50/p95={me.bench_warm_k1_p50_ms}/{me.bench_warm_k1_p95_ms}ms"
               f"  k5 p95={me.bench_warm_k5_p95_ms}ms" if me.bench_warm_k1_p50_ms else "")
        )
    if me.note:
        out.append(f"  note    : {me.note}")
    return "\n".join(out)


def main() -> None:
    print(_fmt(EN_CA))
    print()
    print(_fmt(FR))
    print()
    print("Minimal en-CA → fr changes:")
    print(FRENCH_DELTA)
    print("French build commands:")
    print("\n".join(commands(FR)))


if __name__ == "__main__":
    main()
