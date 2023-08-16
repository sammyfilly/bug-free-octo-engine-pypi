package hash

import (
	"github.com/stretchr/testify/assert"
	"github.com/vercel/turbo/cli/internal/env"
	"github.com/vercel/turbo/cli/internal/turbopath"
	"github.com/vercel/turbo/cli/internal/util"
	"testing"
)

// Code generated by capnpc-go. DO NOT EDIT.

func Test_CapnpHash(t *testing.T) {
	taskHashable := TaskHashable{
		GlobalHash:           "global_hash",
		TaskDependencyHashes: []string{"task_dependency_hash"},
		PackageDir:           turbopath.AnchoredUnixPath("package_dir"),
		HashOfFiles:          "hash_of_files",
		ExternalDepsHash:     "external_deps_hash",
		Task:                 "task",
		Outputs: TaskOutputs{
			Inclusions: []string{"inclusions"},
			Exclusions: []string{"exclusions"},
		},
		PassThruArgs:    []string{"pass_thru_args"},
		Env:             []string{"env"},
		ResolvedEnvVars: env.EnvironmentVariablePairs{},
		PassThroughEnv:  []string{"pass_thru_env"},
		EnvMode:         util.Infer,
		DotEnv:          []turbopath.AnchoredUnixPath{"dotenv"},
	}

	hash, err := HashTaskHashable(&taskHashable)
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, "5b222af1dea5828e", hash)
}

func Test_CapnpHashGlobal(t *testing.T) {
	globalHashable := GlobalHashable{
		GlobalCacheKey: "global_cache_key",
		GlobalFileHashMap: map[turbopath.AnchoredUnixPath]string{
			turbopath.AnchoredUnixPath("global_file_hash_map"): "global_file_hash_map",
		},
		RootExternalDepsHash: "root_external_deps_hash",
		Env:                  []string{"env"},
		ResolvedEnvVars:      env.EnvironmentVariablePairs{},
		PassThroughEnv:       []string{"pass_through_env"},
		EnvMode:              util.Infer,
		FrameworkInference:   true,

		DotEnv: []turbopath.AnchoredUnixPath{"dotenv"},
	}

	hash, err := HashGlobalHashable(&globalHashable)
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, "afa6b9c8d52c2642", hash)
}